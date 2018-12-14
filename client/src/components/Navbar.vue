<template>
  <div class="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/report">{{ translations.REPORT_AN_ANIMAL }}</router-link>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.nav {
  @include d-flex-centered(flex-end);
  padding: 0 50px;
  height: 60px;
  background-color: $vueGreen;
  margin-bottom: 20px;

  > a {
    padding: 0 10px;
    color:  #fafafa;
    font-weight: 500;
    position: relative;

    &.router-link-exact-active {
      color: #f9dc5c;
    }

    &:not(:first-child):before {
      content: '|';
      color: #fff;
      position: absolute;
      left: -1px;
    }
  }
}
</style>
