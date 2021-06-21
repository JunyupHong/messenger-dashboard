import Vue from 'vue';
import Vuex from 'vuex';
import date from './date/';
import period from './period/';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    date,
    period,
  },
});
