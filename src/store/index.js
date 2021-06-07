import Vue from 'vue';
import Vuex from 'vuex';
import date from './date.js';
import period from './period.js';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    date,
    period,
  },
});
