<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>{{ translations.params('HELLO', {name: 'Neil'}) }}</p>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {},
};
</script>
