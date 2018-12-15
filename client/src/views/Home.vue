<template>
  <div class="home">
    <h1>{{ translations.REPORTS }}</h1>
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
      </thead>
      <tr v-for="item in alerts" :key="item.id">
        <!-- <td>{{ item.id }}</td> -->
        <td>{{ item.date | moment("d/M/YY")}}</td>
        <td>{{ item.interval.from | moment("H[h]")}}-{{ item.interval.to | moment("H[h]") }}</td>
        <td>
          <a :href="'mailto:' + item.caller">{{ item.caller }}</a>
        </td>
        <td>{{ translations[item.animal] }}</td>
        <td>{{ item.color }}</td>
        <td v-html="$options.filters.nl2br(item.address)"></td>
        <td>{{ translations[item.health] }}</td>
        <td>
          <img src="@/assets/svg/check-blue.svg" alt="Check" v-if="item.collar">
        </td>
        <td>{{ translations[`STATE_${item.state}`] }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'home',
  components: {},
  created() {
    this.fetchAlerts();
  },
  data() {
    return {
      loaded: false,
      alerts: [],
    };
  },
  methods: {
    async fetchAlerts() {
      const alerts = await axios.get('http://localhost:3000/alerts')
        .then(res => res.data)
        .catch(err => console.log(err)); // eslint-disable-line
      this.loaded = true;
      this.alerts = alerts;
    },
  },
  filters: {
    nl2br(string) {
      return string.split('\n').join('<br>');
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

    > table.reports {
      margin: 50px auto;

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

          > img {
            width: 50%;
            display: block;
            margin: auto;
          }
        }

        &:nth-child(odd) {
          background-color: rgba($vueGreen, .2);
        }
      }
    }
  }
</style>
