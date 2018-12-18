<template>
    <div
      class="dropdown-component"
      :class="{opened: dropdown.show}"
      @click="dropdown.show = !dropdown.show">
      <div class="dropdown">
        <div class="value">{{ dropdown.value }}</div>
        <div
          class="options"
          v-if="dropdown.show"
          @mouseleave="closeDropdown">
          <div
            v-for="(value, index) in constraint || values"
            @click="select(value)"
            :key="index"
            >{{ value }}
          </div>
        </div>
      </div>
      <div class="button"><span :class="{opened: dropdown.show}"></span></div>
    </div>
</template>

<script>
export default {
  props: ['values', 'constraint', 'value'],
  data() {
    return {
      dropdown: {
        show: false,
        value: this.value,
      },
    };
  },
  methods: {
    closeDropdown() {
      setTimeout(() => {
        this.dropdown.show = false;
      }, 500);
    },
    select(value) {
      this.$emit('update:value', value);
      this.$emit('update', value);
      this.dropdown.value = value;
    },
  },
  computed: {
    validValues() {
      return this.values.filter(value => value > this.constraint);
    },
  },
};
</script>

<style lang="scss" scoped>
  .dropdown-component {
    position: relative;
    display: inline-flex;
    border-radius: 5px;
    border: 1px solid rgba(#3b3b3b, .2);

    &.opened {
      border-radius: 5px 5px 0 0;
    }

    > div {
      height: 40px;
      padding: 0 15px;
      flex: 1 1 0;
      flex-wrap: nowrap;
      @include d-flex-centered(center);

      &:last-child {
        padding: 0 15px;
        border-left: 1px solid rgba(#3b3b3b, .2);
        background-color: rgba(#f2f1ef, .4);
      }

      &.dropdown {
        > .options {
          background-color: #fff;
          border-radius: 0 0 5px 5px;
          border: 1px solid rgba(#3b3b3b, .2);
          position: absolute;
          left: -1px;
          right: 0;
          top: 41px;
          max-height: 200px;
          overflow-y: auto;
          z-index: 1;

          > div {
            text-align: center;
            padding: 10px 0;
            background-color: #fff;
            position: relative;

            &:hover {
              background-color: rgba(#d2d7d3, .2);
            }

            &:after {
              content: '';
              position: absolute;
              // width: 100%;
              left: 0;
              right: 0;
              bottom: 0;
              border: solid 1px #f2f1ef;
            }
          }
        }
      }

      &.button {
        > span {
          width: 10px;
          height: 10px;
          border-top: 1px solid #3b3b3b;
          border-right: 1px solid #3b3b3b;
          transform: rotate(135deg);

          &.opened {
            transform: rotate(-45deg);
          }
        }
      }
    }
  }
</style>
