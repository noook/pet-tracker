import Vue from 'vue';
import App from './App.vue';
import router from './router';

import './utils/mixins/translations';

Vue.config.productionTip = false;
Vue.prototype.$lang = 'fr';

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
