<template>
  <div class="home">
    <h1>{{ translations.REPORTS }}</h1>
    <section>
      <div class="filters">
        <label>{{ translations.STATE_FILTER }}</label>
        <div class="filter">
          <Checkbox :value.sync="all" @click="toggleAll"/>
          <label>{{ translations['STATE_ALL'] }}</label>
        </div>
        <div class="filter" v-for="(value, key) in filters" :key="key">
          <Checkbox :value.sync="filters[key] = value" />
          <label>{{ translations[`STATE_${key}`] }}</label>
        </div>
      </div>
      <table v-if="loaded" class="reports">
        <thead>
          <td>{{ translations.DATE }}</td>
          <td>{{ translations.INTERVAL }}</td>
          <td>{{ translations.CALLER }}</td>
          <td>{{ translations.ANIMAL }}</td>
          <td>{{ translations.COLOR }}</td>
          <td>{{ translations.ADDRESS }}</td>
          <td>{{ translations.HEALTH }}</td>
          <td>{{ translations.COLLAR }}</td>
          <td>{{ translations.STATUS }}</td>
          <td>{{ translations.EDIT }}</td>
        </thead>
        <tr v-for="item in filteredAlerts" :key="item.id">
          <td>{{ item.date | moment("d/M/YY")}}</td>
          <td>{{ item.interval.from | moment("H[h]")}}-{{ item.interval.to | moment("H[h]") }}</td>
          <td>
            <a :href="'mailto:' + item.caller">{{ item.caller }}</a>
          </td>
          <td>{{ translations[item.animal] }}</td>
          <td>{{ item.color }}</td>
          <td class="address">{{ item.address }}<br>{{ item.zipcode }}, {{ item.city }}</td>
          <td>{{ translations[item.health] }}</td>
          <td>
            <img src="@/assets/svg/check-blue.svg" alt="Check" v-if="item.collar">
          </td>
          <td>{{ translations[`STATE_${item.state}`] }}</td>
          <td>
            <img
              class="edit-button"
              @click="$router.replace({ name: 'edit-report', params: item })"
              src="@/assets/svg/button-edit.svg"
              alt="Edit button">
          </td>
        </tr>
      </table>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

import Checkbox from '@/components/inputs/Checkbox.vue';

export default {
  name: 'home',
  components: {
    Checkbox,
  },
  created() {
    this.fetchAlerts();
  },
  data() {
    return {
      filters: {
        ALERTED: true,
        ASSIGNED: true,
        SAVED: true,
        FAILED: true,
        CANCELED: true,
      },
      loaded: false,
      alerts: [],
    };
  },
  computed: {
    areAllChecked() {
      const list = ['ALERTED', 'ASSIGNED', 'SAVED', 'FAILED', 'CANCELED'];
      let yes = true;
      for (let i = 0; i < list.length; i += 1) {
        if (!this.filters[list[i]]) {
          yes = false;
        }
      }
      return yes;
    },
    all: {
      get() {
        return this.areAllChecked;
      },
      set(newValue) {
        const list = ['ALERTED', 'ASSIGNED', 'SAVED', 'FAILED', 'CANCELED'];
        for (let i = 0; i < list.length; i += 1) {
          this.filters[list[i]] = newValue;
        }
      },
    },
    filteredAlerts() {
      const filters = [];
      for (const i in this.filters) {
        if (this.filters[i]) {
          filters.push(i);
        }
      }
      return this.alerts.filter(item => filters.includes(item.state));
    },
  },
  methods: {
    async fetchAlerts() {
      const alerts = await axios.get('http://localhost:3000/alerts')
        .then(res => res.data)
        .catch(err => console.log(err)); // eslint-disable-line
      this.loaded = true;
      this.alerts = alerts;
    },
    toggleAll() {
      const list = ['ALERTED', 'ASSIGNED', 'SAVED', 'FAILED', 'CANCELED'];
      for (let i = 0; i < list.length; i += 1) {
        this.filters[list[i]] = !this.all;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .home {
    > h1 {
      font-size: 2rem;
      text-align: center;
    }
    > section {
      width: 80%;
      margin: 20px auto;

      > .filters {
        @include d-flex-centered(flex-start);

        > .filter {
          @include d-flex-centered(space-between);
          margin: 0 10px;

          > .checkbox {
            margin-right: 10px;
          }
        }
      }

      > table.reports {
        margin: 20px 0;

        > thead {
          > td {
            padding: 20px;
            text-align: center;
            border: 1px solid rgba(#3b3b3b, .2);
            background-color: rgba($vueGreen, .3);
          }
        }

        > tr {
          > td {
            padding: 20px;
            border: 1px solid rgba(#3b3b3b, .2);

            &.address {
              min-width: 200px;
            }

            > img {
              width: 50%;
              display: block;
              margin: auto;

              &.edit-button:hover {
                cursor: pointer;
              }
            }
          }

          &:nth-child(odd) {
            background-color: rgba($vueGreen, .2);
          }
        }
      }
    }
  }
</style>
