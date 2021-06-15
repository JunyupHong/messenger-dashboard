import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date.js';
import cloneDeep from 'lodash/cloneDeep';

const date = {
  namespaced: true,
  state: () => ({
    firstSelectedDate: new Date(new Date().setFullYear(2020)),
    secondSelectedDate: null,
    firstDate: [],
    secondDate: [],
    firstDateLegends: [],
    secondDateLegends: [],
  }),

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

    changeFirstDateLegends(state, payload) {
      state.firstDateLegends = payload.map((legend, i) => ({
        ...legend,
        active: state.firstDateLegends[i] ? state.firstDateLegends[i].active : true,
      }));
    },

    changeSecondDateLegends(state, payload) {
      state.secondDateLegends = payload.map((legend, i) => ({
        ...legend,
        active: state.secondDateLegends[i] ? state.secondDateLegends[i].active : true,
      }));
    },

    toggleFirstDateLegend(state, payload) {
      const newLegend = cloneDeep(state.firstDateLegends);
      const idx = state.firstDateLegends.findIndex(legend => legend.name === payload.legend.name);
      newLegend.splice(idx, 1, { ...payload.legend, active: !state.firstDateLegends[idx].active });
      state.firstDateLegends = newLegend;
    },

    toggleSecondDateLegend(state, payload) {
      const newLegend = cloneDeep(state.secondDateLegends);
      const idx = state.secondDateLegends.findIndex(legend => legend.name === payload.legend.name);
      newLegend.splice(idx, 1, { ...payload.legend, active: !state.secondDateLegends[idx].active });
      state.secondDateLegends = newLegend;
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
