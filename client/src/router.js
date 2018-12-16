import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import ReportAnimal from './views/ReportAnimal.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/report',
      name: 'report',
      component: ReportAnimal,
    },
    {
      path: '/report/edit',
      name: 'edit-report',
      component: ReportAnimal,
      beforeEnter: (to, from, next) => {
        if (!to.params.id) {
          next({ path: '/' });
        }
        next();
      },
    },
  ],
});
