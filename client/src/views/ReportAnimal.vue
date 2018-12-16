<template>
  <div class="report-an-animal">
    <h1 v-if="!submitted">{{ translations.AINMAL_REPORTING_FORM }}</h1>
    <h3 v-if="edit && !submitted">{{ translations.EDITION }}</h3>
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
      <div
        class="buttons button-submit"
        v-if="!edit"
        @click="submitAlert">{{ translations.SUBMIT }}</div>
      <div
        class="buttons button-edit"
        v-if="edit"
        @click="editAlert">{{ translations.EDIT }}</div>
      <div
        class="buttons button-delete"
        v-if="edit"
        @click="deleteAlert">{{ translations.DELETE }}</div>
    </form>
    <div v-if="submitted" class="submit-success">
      <h3>{{ translations.SUCCESS }}</h3>
      <h2 v-if="!edit">{{ translations.THANKS_FOR_SUBMITTING}}</h2>
      <h2 v-if="submitted == 'edited'">{{ translations.SUCCESS_CONTENT_EDITED}}</h2>
      <h2 v-if="submitted == 'deleted'">{{ translations.SUCCESS_CONTENT_DELETED}}</h2>
      <div class="buttons button-submit" @click="$router.push('/')">{{ translations.HOME }}</div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

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
      edit: this.$route.name === 'edit-report',
    };
  },
  created() {
    if (this.$route.name !== 'edit-report') {
      return false;
    }
    const { params } = this.$route;
    this.id = params.id;
    this.form = {
      where: {
        address: params.address,
        zipcode: params.zipcode,
        city: params.city,
      },
      color: params.color,
      email: params.caller,
      date: moment(params.date).format('YYYY-M-D'),
      collar: params.collar,
    };
    this.interval = {
      from: parseInt(moment(params.interval.from).format('H'), 10),
      to: parseInt(moment(params.interval.to).format('H'), 10),
    };
    this.animals = params.animal;
    this.healths = params.health;
    return true;
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
    animals: {
      get() {
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
      set(value) {
        this.animals.chosen = this.translations[value];
      },
    },
    chosenAnimal() {
      const animals = Object.entries(this.animals.values);
      return animals.find(item => item[1] === this.animals.chosen)[0];
    },
    chosenHealth() {
      const healths = Object.entries(this.healths.values);
      return healths.find(item => item[1] === this.healths.chosen)[0];
    },
    healths: {
      get() {
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
      set(value) {
        this.healths.chosen = this.translations[value];
      },
    },
  },
  methods: {
    submitAlert() {
      axios.post('http://localhost:3000/alerts', {
        ...this.form,
        interval: this.interval,
        animal: this.chosenAnimal,
        health: this.chosenHealth,
      })
        .then(() => { this.submitted = true; })
        .catch(err => console.log(err)); // eslint-disable-line
    },
    editAlert() {
      axios.put('http://localhost:3000/alerts', {
        id: this.id,
        ...this.form,
        interval: this.interval,
        animal: this.chosenAnimal,
        health: this.chosenHealth,
      })
        .then(() => { this.submitted = 'edited'; })
        .catch(err => console.log(err)); // eslint-disable-line
    },
    deleteAlert() {
      axios.delete('http://localhost:3000/alerts', {
        data: {
          id: this.id,
        },
      })
        .then(() => { this.submitted = 'deleted'; })
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

    h3 {
      color: $vueGreen;
      font-size: 1.5rem;
      margin: 10px 0;
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

    .buttons {
      padding: 10px 20px;
      margin-top: 10px;
      margin-right: 10px;
      display: inline-block;
      color: #fff;
      border-radius: 5px;

      &.button-submit {
        background-color: $vueGreen;
      }
      &.button-edit {
        background-color: $flatBlue;
      }
      &.button-delete {
        background-color: $flatRed;
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
