import Vue from 'vue';
import VueRouter from 'vue-router';
import Period from '../views/Period.vue';
import Date from '../views/Date.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Period',
    component: Period,
  },
  {
    path: '/date',
    name: 'Date',
    component: Date,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
