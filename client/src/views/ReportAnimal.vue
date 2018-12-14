<template>
  <div class="report-an-animal">
    <h1>{{ translations.AINMAL_REPORTING_FORM }}</h1>
    <form action="">
      <div class="group">
        <label for="report-date">{{ translations.DATE }}</label>
        <input type="date" name="date" id="report-date" :max="now">
        <label for="report-date">{{ translations.DATE }}</label>
        <Dropdown
          :values="hours"
          :constraint="validFrom"
          :interval.sync="interval.from"/>
        <label for="report-date">{{ translations.DATE }}</label>
        <Dropdown
          :values="hours"
          :constraint="validTo"
          :interval.sync="interval.to"/>
      </div>
    </form>
  </div>
</template>

<script>
import Dropdown from '@/components/inputs/Dropdown.vue';
import { times } from 'lodash';

export default {
  data() {
    let now = new Date(Date.now());
    now = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    return {
      form: {},
      hours: times(24, Number),
      interval: {
        from: 13,
        to: 14,
      },
      now,
    };
  },
  components: {
    Dropdown,
  },
  computed: {
    validFrom() {
      return this.hours.filter(v => v < this.interval.to);
    },
    validTo() {
      return this.hours.filter(v => v > this.interval.from);
    },
  },
};
</script>


<style lang="scss" scoped>
  .report-an-animal {
    > h1 {
      font-size: 2rem;
      margin: 20px 0;
    }

    > form {
      > .group {
        @include d-flex-centered(flex-start);
        > input[type="date"] {
          padding: 5px 0;
          font-size: .8rem;
          margin: 0 10px;
          font-family: $defaultFont;
        }

        .dropdown-component {
          margin: 0 10px;
        }
      }
    }
  }
</style>
