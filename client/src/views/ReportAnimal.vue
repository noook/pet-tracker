<template>
  <div class="report-an-animal">
    <h1>{{ translations.AINMAL_REPORTING_FORM }}</h1>
    <form action="">
      <div class="group">
        <label for="report-date">{{ translations.DATE }}</label>
        <input
          type="date"
          name="date"
          v-model="date"
          placeholder="dd-mm-yyyy"
          id="report-date"
          :max="now">
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
      <div class="group alerter-email">
        <div class="email-label">
          <label for="alerter-email">{{ translations.YOUR_EMAIL }}</label>
          <Tooltip :text="translations.WE_WILL_CONTACT_YOU_ON_UPDATE"/>
        </div>
        <input
          type="email"
          name="alerter-email"
          :placeholder="translations.YOUR_EMAIL"
          id="alerter-email">
      </div>
    </form>
  </div>
</template>

<script>
import Dropdown from '@/components/inputs/Dropdown.vue';
import Tooltip from '@/components/inputs/Tooltip.vue';
import { times } from 'lodash';

export default {
  name: 'ReportAnimal',
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
      date: now,
      now,
    };
  },
  components: {
    Dropdown,
    Tooltip,
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
    width: 60%;
    margin: auto;

    > h1 {
      font-size: 2rem;
      margin: 20px 0;
    }

    > form {
      > .group {
        margin: 10px 0;
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

        &.alerter-email {
          @include d-flex-centered(flex-start);
          flex-direction: column;
          align-items: flex-start;

          > .email-label {
            @include d-flex-centered(flex-start);
          }

          > input[type="email"] {
            display: block;
            border-radius: 5px;
            border: solid 1px rgba(#3b3b3b, .2);
            padding: 5px;
            margin: 5px 0;
          }
        }
      }
    }
  }
</style>
