<template>
  <div class="report-detail">
    <h2>{{ translations.REPORT_DETAILS }}</h2>
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
              @update="squadChanged($event)"
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
              @update="stateChanged($event)"
              :values="states.list"
              :value.sync="states.chosen"/>
          </p>
        </div>
      </div>
    </div>
    <div class="action-button"
      @click="updateAlert"
      v-if="valuesChanged.squad || valuesChanged.state">
      {{ translations.SAVE }}
    </div>
    <div class="success-log">{{ translations.SUCCESS_CONTENT_EDITED }}</div>
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
      originalValues: {
        squad: null,
        state: null,
      },
      valuesChanged: {
        squad: false,
        state: false,
      },
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
        this.originalValues.state = alert.state;
        this.originalValues.squad = alert.squad_name || 'NONE';

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
    squadChanged(newValue) {
      this.valuesChanged.squad = this.squads.values[this.originalValues.squad] !== newValue;
    },
    stateChanged(newValue) {
      this.valuesChanged.state = this.states.values[this.originalValues.state] !== newValue;
    },
    updateAlert() {
      axios.put(`http://localhost:3000/alerts/${this.$route.params.id}`, {
        squad: this.chosenSquad,
        state: this.chosenState,
      })
        .then(({ data }) => {
          this.originalValues = {
            squad: data.squad,
            state: data.state,
          };
          this.valuesChanged = {
            squad: false,
            state: false,
          };
          document.querySelector('.success-log').classList.add('animated');
          setTimeout(() => {
            document.querySelector('.success-log').classList.remove('animated');
          }, 5000);
        })
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
    chosenSquad() {
      const squads = Object.entries(this.squads.values);
      return squads.find(item => item[1] === this.squads.chosen)[0];
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
    chosenState() {
      const states = Object.entries(this.states.values);
      return states.find(item => item[1] === this.states.chosen)[0];
    },
  },
};
</script>

<style lang="scss" scoped>
  @keyframes fade-log {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }

  .report-detail {
    width: 50%;
    margin: 50px auto;

    > h2 {
      font-size: 2rem;
      color: $vueGreen;
      padding: 10px 0;
    }

    > .details {
      margin: 10px 0;
      > .row {
        margin: 15px 0;
        @include d-flex-centered(flex-start);

        > .group {
          @include d-flex-centered(flex-start);
          margin-right: 10px;
          font-size: 1.2rem;

          &.address {
            align-items: flex-start;
          }

          > label {
            margin-right: 10px;
          }

          > p {
            > a {
              color: $flatBlue;
            }
          }
        }
      }
    }
    > .action-button {
      float: left;
      padding: 15px 10px;
      color: #fff;
      border-radius: 10px;
      background-color: $flatBlue;

      &:hover {
        cursor: pointer;
      }
    }

    > .success-log {
      color: $vueGreen;
      display: none;

      &.animated {
        animation-fill-mode: forwards;
        display: block;
        animation: fade-log 5s;
      }
    }
  }
</style>
