import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date.js';
import { chain as _ } from 'lodash';

const date = {
  state: () => ({
    firstSelectedDate: new Date(new Date().setFullYear(2020)),
    secondSelectedDate: null,
    firstDate: [],
    secondDate: [],
  }),

  getters: {
    selectedDate(state) {
      return [state.firstSelectedDate, state.secondSelectedDate];
    },
    totalFirstDate(state) {
      return state.firstDate.reduce((acc, cur) => acc + cur.max_user, 0);
    },
    maxFirstDate(state) {
      return Math.max(...state.firstDate.map(first => first.max_user));
    },
    totalSecondDate(state) {
      return state.secondDate.reduce((acc, cur) => acc + cur.max_user, 0);
    },
    maxSecondDate(state) {
      return Math.max(...state.secondDate.map(second => second.max_user));
    },
    firstDateServers(state) {
      return _(state.firstDate)
        .groupBy(date => date.serverinfo_uid)
        .values()
        .value();
    },
    secondDateServers(state) {
      return _(state.secondDate)
        .groupBy(date => date.serverinfo_uid)
        .values()
        .value();
    },
  },

  mutations: {
    changeFirstDate(state, payload) {
      state.firstSelectedDate = payload;
    },
    changeSecondDate(state, payload) {
      state.secondSelectedDate = payload;
    },
    changeFirstData(state, payload) {
      state.firstDate = payload.data;
    },
    changeSecondData(state, payload) {
      state.secondDate = payload.data;
    },
  },
  actions: {
    async fetchFirstDate({ state, commit }) {
      const result = await fetchDate(dateToString(state.firstSelectedDate));
      commit({
        type: 'changeFirstData',
        data: result,
      });
    },
    async fetchSecondDate({ state, commit }) {
      const result = await fetchDate(dateToString(state.secondSelectedDate));
      commit({
        type: 'changeSecondData',
        data: result,
      });
    },
  },
};

export default date;
