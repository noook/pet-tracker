<template>
  <div class="report-detail">
    <div class="details" v-if="loaded">
      <div class="row">
        <div class="group">
          <label>{{ translations.DETAIL_REPORT_DATE }}</label>
          <p>{{ alert.date | moment("D/M/YYYY") }} {{ timeInterval }}</p>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label>{{ translations.FORM_ANIMAL_TYPE }}</label>
          <p>{{ translations[alert.animal] }}</p>
        </div>
        <div class="group">
          <label>{{ translations.FORM_COLOR }}</label>
          <p>{{ alert.color }}</p>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label>{{ translations.FORM_ANIMAL_HEALTH }}</label>
          <p>{{ translations[alert.health] }}</p>
        </div>
      </div>
      <div class="row">
        <div class="group address">
          <label>{{ translations.DETAIL_PLACE }}</label>
          <p>{{ alert.address }},<br>{{ alert.zipcode }} {{ alert.city }}</p>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label>{{ translations.FORM_CALLER }}</label>
          <p><a :href="`mailto:${alert.caller}`">{{ alert.caller }}</a></p>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label>{{ translations.ASSIGNED_SQUAD}}</label>
          <p>
            <Dropdown
              :values="squads.list"
              :value.sync="squads.chosen"/>
          </p>
        </div>
      </div>
      <div class="row">
        <div class="group">
          <label>{{ translations.REPORT_STATUS}}</label>
          <p>
            <Dropdown
              :values="states.list"
              :value.sync="states.chosen"/>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

import Dropdown from '@/components/inputs/Dropdown.vue';

export default {
  name: 'ReportDetail',
  components: {
    Dropdown,
  },
  data() {
    return {
      alert: null,
      loaded: false,
      availableSquads: [],
    };
  },
  created() {
    Promise.all([
      this.fetchAlert(),
      this.fetchSquads(),
    ])
      .then(([alert, squads]) => {
        this.alert = alert;
        this.availableSquads = squads;
        if (alert.squad_name) {
          this.squads.chosen = alert.squad_name;
        }
        this.loaded = true;
      })
      .catch(err => console.log(err)); // eslint-disable-line
  },
  methods: {
    fetchAlert() {
      return axios.get(`http://localhost:3000/alerts/${this.$route.params.id}`)
        .then(({ data }) => data)
        .catch(err => console.log(err)); // eslint-disable-line
    },
    fetchSquads() {
      return axios.get('http://localhost:3000/squads/')
        .then(({ data }) => data)
        .catch(err => console.log(err)); // eslint-disable-line
    },
  },
  computed: {
    timeInterval() {
      const from = moment(this.alert.hour_from).format('H');
      const to = moment(this.alert.hour_to).format('H');
      return this.translations.params('DETAIL_REPORT_INTERVAL', { from, to });
    },
    squads: {
      get() {
        const values = {};
        for (let i = 0; i < this.availableSquads.length; i += 1) {
          values[this.availableSquads[i]] = this.availableSquads[i];
        }
        values.NONE = this.translations.SQUAD_NONE;

        return {
          chosen: this.translations.SQUAD_NONE,
          list: [this.translations.SQUAD_NONE, ...this.availableSquads],
          values,
        };
      },
      set(newValue) {
        this.squads.chosen = this.squads.values[newValue];
      },
    },
    states: {
      get() {
        const states = ['ALERTED', 'ASSIGNED', 'SAVED', 'FAILED', 'CANCELED'];
        const values = {};
        for (let i = 0; i < states.length; i += 1) {
          values[states[i]] = this.translations[`STATE_${states[i]}`];
        }

        return {
          chosen: this.translations[`STATE_${this.alert.state}`],
          list: states.map(item => this.translations[`STATE_${item}`]),
          values,
        };
      },
      set(newValue) {
        this.states.chosen = this.states.values[newValue];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
  .report-detail {
    width: 50%;
    margin: 100px auto;

    > .details {
      > .row {
        margin: 15px 0;
        @include d-flex-centered(flex-start);

        > .group {
          @include d-flex-centered(flex-start);
          margin: 0 10px;
          font-size: 1.2rem;

          &.address {
            align-items: flex-start;
          }

          > label {
            margin: 0 10px;
          }

          > p {
            > a {
              color: $flatBlue;
            }
          }
        }
      }
    }
  }
</style>
