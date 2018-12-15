<template>
  <div class="home">
    <h1>{{ translations.REPORTS }}</h1>
    <table v-if="loaded">
      <tr v-for="item in alerts" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.date | moment("d/M/YY")}}</td>
        <td>
          <a :href="'mailto:' + item.caller">{{ item.caller }}</a>
        </td>
        <td>{{ translations[item.animal] }}</td>
        <td>{{ item.color }}</td>
        <td>{{ item.address }}</td>
        <td>{{ translations[item.health] }}</td>
        <td>{{ item.collar ? translations.YES : translations.NO }}</td>
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
};
</script>

<style lang="scss" scoped>
  .home {
    > h1 {
      font-size: 2rem;
      text-align: center;
    }
  }
</style>
