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
    firstDateLegends: [
      { name: '사내 (54)', color: '#00519E', active: true },
      { name: '일반 (93)', color: '#2E447F', active: false },
      { name: '단독 (242)', color: '#1D7ABD', active: true },
      { name: '전용 (198)', color: '#89C6E1', active: false },
      { name: '전옹 (88)', color: '#90BEDE', active: true },
      { name: '전용 (97)', color: '#000000', active: false },
      { name: 'KBS (182)', color: '#cccccc', active: false },
    ],
    secondDateLegends: [
      { name: '사내 (54)', color: '#E75113', active: true },
      { name: '일반 (93)', color: '#F9B200', active: false },
      { name: '단독 (242)', color: '#E7823F', active: true },
      { name: '전용 (198)', color: '#CF4F2E', active: false },
      { name: '전옹 (88)', color: '#EA7D24', active: false },
      { name: '전용 (97)', color: '#000000', active: false },
      { name: 'KBS (182)', color: '#cccccc', active: true },
    ],
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
