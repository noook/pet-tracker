<template>
  <div class="checkbox" @click="toggle">
    <img src="@/assets/svg/check-blue.svg" alt="check" v-show="value">
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: Boolean,
  },
  methods: {
    toggle() {
      this.$emit('update:value', !this.value);
    },
  },
};
</script>


<style lang="scss" scoped>
  .checkbox {
    width: 20px;
    height: 20px;
    border-radius: 5px;
    border: solid 1px #3b3b3b;
    @include d-flex-centered(center);
    user-select: none;

    > img {
      width: 100%;
    }
  }
</style>
