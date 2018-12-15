<template>
  <div class="report-an-animal">
    <h1 v-if="!submitted">{{ translations.AINMAL_REPORTING_FORM }}</h1>
    <form @submit="submitAlert" v-if="!submitted">
      <div class="group">
        <label for="report-date">{{ translations.FORM_DATE }}</label>
        <input
          type="date"
          name="date"
          v-model="form.date"
          placeholder="dd-mm-yyyy"
          id="report-date"
          :max="form.now">
        <label for="report-date">{{ translations.BETWEEN }}</label>
        <Dropdown
          :values="hours"
          :constraint="validFrom"
          :value.sync="interval.from"/>
        <label for="report-date">{{ translations.AND }}</label>
        <Dropdown
          :values="hours"
          :constraint="validTo"
          :value.sync="interval.to"/>
        {{ translations.HOURS }}
      </div>
      <div class="group row">
        <div class="address row-item">
          <label for="color">{{ translations.FORM_COLOR }}</label>
          <input
            type="text"
            v-model="form.color"
            name="color"
            id="color">
        </div>
        <div class="animal-type row-item">
          <div class="dropdown-label">
            <label>{{ translations.FORM_ANIMAL_TYPE }}</label>
          </div>
          <Dropdown
            :values="animals.list"
            :value.sync="animals.chosen"/>
        </div>
      </div>
      <div class="group row">
        <div class="dropdown-label row-item">
          <div>
            <label>{{ translations.FORM_ANIMAL_HEALTH }}</label>
            <Dropdown
              :values="healths.list"
              :value.sync="healths.chosen"/>
          </div>
        </div>
      </div>
      <div class="group row">
        <div class="row-item">
          <div class="dropdown-label">
            <Checkbox :value.sync="form.collar"/>
            <label>{{ translations.ANIMAL_WORE_COLLAR }}</label>
          </div>
        </div>
      </div>
      <hr>
      <div class="group row">
        <div class="alerter-email row-item">
          <div class="dropdown-label">
            <label for="alerter-email">{{ translations.FORM_YOUR_EMAIL }}</label>
            <Tooltip :text="translations.WE_WILL_CONTACT_YOU_ON_UPDATE"/>
          </div>
          <input
            type="email"
            v-model="form.email"
            name="alerter-email"
            :placeholder="translations.EMAIL"
            id="alerter-email">
        </div>
      </div>
      <p>{{ translations.WHERE_DID_YOU_FIND_IT }}</p>
      <div class="group row">
        <div class="address row-item">
          <label for="address">{{ translations.FORM_ADDRESS }}</label>
          <input
            type="text"
            v-model="form.where.address"
            name="address"
            id="address">
        </div>
        <div class="address row-item">
          <label for="zipcode">{{ translations.FORM_ZIPCODE }}</label>
          <input
            type="text"
            v-model="form.where.zipcode"
            name="zipcode"
            maxlength="5"
            id="zipcode">
        </div>
        <div class="address row-item">
          <label for="city">{{ translations.FORM_CITY }}</label>
          <input
            v-model="form.where.city"
            type="text"
            name="city"
            id="city">
        </div>
      </div>
      <div class="button-submit" @click="submitAlert">{{ translations.SUBMIT }}</div>
    </form>
    <div v-if="submitted" class="submit-success">
      <h2>{{ translations.THANKS_FOR_SUBMITTING}}</h2>
      <div class="button-submit" @click="$router.push('/')">{{ translations.HOME }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Dropdown from '@/components/inputs/Dropdown.vue';
import Tooltip from '@/components/inputs/Tooltip.vue';
import Checkbox from '@/components/inputs/Checkbox.vue';
import { times } from 'lodash';

export default {
  name: 'ReportAnimal',
  data() {
    let now = new Date(Date.now());
    now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return {
      submitted: false,
      hours: times(24, Number),
      interval: {
        from: 13,
        to: 14,
      },
      form: {
        where: {
          address: null,
          zipcode: null,
          city: null,
        },
        color: null,
        email: null,
        date: now,
        now,
        collar: false,
      },
    };
  },
  components: {
    Dropdown,
    Tooltip,
    Checkbox,
  },
  computed: {
    validFrom() {
      return this.hours.filter(v => v < this.interval.to);
    },
    validTo() {
      return this.hours.filter(v => v > this.interval.from);
    },
    animals() {
      return {
        chosen: this.translations.CAT,
        list: [
          this.translations.CAT,
          this.translations.DOG,
          this.translations.PARROT,
          this.translations.RABBIT,
        ],
        values: {
          CAT: this.translations.CAT,
          DOG: this.translations.DOG,
          PARROT: this.translations.PARROT,
          RABBIT: this.translations.RABBIT,
        },
      };
    },
    healths() {
      return {
        chosen: this.translations.MEDIUM,
        list: [
          this.translations.VERY_LOW,
          this.translations.LOW,
          this.translations.MEDIUM,
          this.translations.GOOD,
        ],
        values: {
          VERY_LOW: this.translations.VERY_LOW,
          LOW: this.translations.LOW,
          MEDIUM: this.translations.MEDIUM,
          GOOD: this.translations.GOOD,
        },
      };
    },
  },
  methods: {
    submitAlert() {
      const animals = Object.entries(this.animals.values);
      const animal = animals.find(item => item[1] === this.animals.chosen)[0];
      const healths = Object.entries(this.healths.values);
      const health = healths.find(item => item[1] === this.healths.chosen)[0];
      axios.post('http://localhost:3000/alerts', {
        ...this.form,
        interval: this.interval,
        animal,
        health,
      })
        .then(() => { this.submitted = true; })
        .catch(err => console.log(err)); // eslint-disable-line
    },
  },
};
</script>


<style lang="scss" scoped>
  .report-an-animal {
    width: 60%;
    margin: auto;

    .submit-success {
      @include d-flex-centered(center);
      flex-direction: column;
    }

    hr {
      width: 100%;
      padding: 10px 0;
      border: none;
    }

    h2 {
      color: $vueGreen;
      font-size: 1.5rem;
      margin: 50px 0;
    }

    > h1 {
      font-size: 2rem;
      margin: 20px 0;
    }

    > form {
      > .group {
        margin: 10px 0;
        @include d-flex-centered(flex-start);

        > .dropdown-label {
          @include d-flex-centered(flex-start);
          flex-direction: row;

          > div {
            @include d-flex-centered(center);
            flex-direction: row;
          }
        }

        > input[type="date"] {
          padding: 5px 0;
          font-size: .8rem;
          margin: 0 10px;
          font-family: $defaultFont;
        }

        .dropdown-component {
          margin: 0 10px;
        }

        > .alerter-email, .row-item {
          @include d-flex-centered(flex-start);
          flex-direction: column;
          align-items: flex-start;

          > .dropdown-label {
            @include d-flex-centered(flex-start);
            flex-direction: row;

            > div {
              @include d-flex-centered(center);
              flex-direction: row;
            }
          }

          > input[type="email"], input[type="text"] {
            display: block;
            border-radius: 5px;
            border: solid 1px rgba(#3b3b3b, .2);
            padding: 5px;
            margin: 5px 0;
          }
        }

        &.row {
          display: flex;
          justify-content: flex-start;
          align-items: center;

          > .row-item {
            margin-right: 15px;

            .checkbox {
              margin-right: 10px;
            }

            &.animal-type, &.animal-health {
              @include d-flex-centered(flex-start);
              flex-direction: row;
            }
          }
        }
      }
    }
    .button-submit {
      padding: 10px 20px;
      margin-top: 10px;
      display: inline-block;
      background-color: $vueGreen;
      color: #fff;
      border-radius: 5px;

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
