import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date.js';
import * as _ from 'lodash';

const date = {
  state: () => ({
    firstSelectedDate: new Date(new Date().setFullYear(2020)),
    secondSelectedDate: null,
    firstDate: [],
    secondDate: [],
    firstDateLegends: [
      { color: '#00519E', name: '사내 (54)', active: true },
      { color: '#2E447F', name: '일반 (93)', active: false },
      { color: '#1D7ABD', name: '단독 (242)', active: true },
      { color: '#89C6E1', name: '전용 (198)', active: false },
      { color: '#90BEDE', name: '전옹 (88)', active: true },
      { color: '#000000', name: '전용 (97)', active: false },
      { color: '#cccccc', name: 'KBS (182)', active: false },
    ],
    secondDateLegends: [
      { color: '#E75113', name: '사내 (54)', active: true },
      { color: '#F9B200', name: '일반 (93)', active: false },
      { color: '#E7823F', name: '단독 (242)', active: true },
      { color: '#CF4F2E', name: '전용 (198)', active: false },
      { color: '#EA7D24', name: '전옹 (88)', active: false },
      { color: '#000000', name: '전용 (97)', active: false },
      { color: '#cccccc', name: 'KBS (182)', active: true },
    ],
  }),

  getters: {
    selectedDate(state) {
      return [state.firstSelectedDate, state.secondSelectedDate];
    },
    totalFirstDate(state) {
      return state.firstDate.reduce((acc, cur) => acc + cur.max_user, 0);
    },
    maxFirstDate(state) {
      return (
        _(state.firstDate)
          .groupBy(date => date.conn_hours)
          .map(date => date.reduce((acc, cur) => acc + cur.max_user, 0))
          .max() || 0
      );
    },
    totalSecondDate(state) {
      return state.secondDate.reduce((acc, cur) => acc + cur.max_user, 0);
    },
    maxSecondDate(state) {
      return (
        _(state.secondDate)
          .groupBy(date => date.conn_hours)
          .map(date => date.reduce((acc, cur) => acc + cur.max_user, 0))
          .max() || 0
      );
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
    firstDateByTimes(state) {
      return _(state.firstDate)
        .groupBy(date => date.conn_hours)
        .values()
        .value();
    },
    secondDateByTimes(state) {
      return _(state.secondDate)
        .groupBy(date => date.conn_hours)
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
    toggleFirstDateLegend(state, payload) {
      const newLegend = _.cloneDeep(state.firstDateLegends);
      const idx = state.firstDateLegends.findIndex(legend => legend.name === payload.legend.name);
      newLegend.splice(idx, 1, { ...payload.legend, active: !state.firstDateLegends[idx].active });
      state.firstDateLegends = newLegend;
    },
    toggleSecondDateLegend(state, payload) {
      const newLegend = _.cloneDeep(state.secondDateLegends);
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
