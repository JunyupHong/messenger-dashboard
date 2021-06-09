import { fetchPeriod } from '@/api';
import { dateToString } from '@/utils/date.js';

const period = {
  namespaced: true,
  state: () => ({
    selectedPeriod: [
      new Date(new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 3)),
      new Date(new Date().setFullYear(2020)),
    ],
    userCounts: new Map(),
  }),
  getters: {
    prevWeekPeriods() {
      const periods = [];
      const end = new Date(new Date().setFullYear(2020));
      while (end.getDay() !== 1) {
        periods.unshift(dateToString(end));
        end.setDate(end.getDay() - 1);
      }

      let start = new Date(new Date().setFullYear(2020, new Date().getMonth(), end.getDate() - 7));
      while (start < end) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }

      return periods;
    },
    weekPeriods() {
      const periods = [];
      let end = new Date(new Date().setFullYear(2020));
      while (end.getDay() !== 1) {
        periods.unshift(dateToString(end));
        end.setDate(end.getDate() - 1);
      }
      periods.unshift(dateToString(end));

      return periods;
    },
    prevMonthPeriods() {
      const periods = [];
      let start = new Date(new Date().setFullYear(2020, new Date().getMonth() - 1, 1));
      const end = new Date(new Date().setFullYear(2020, new Date().getMonth(), 1));
      while (start < end) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },
    monthPeriods() {
      const periods = [];
      let start = new Date(new Date().setFullYear(2020, new Date().getMonth(), 1));
      const today = new Date(new Date().setFullYear(2020));
      while (start <= today) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },
    prevCustomPeriods(state, getters) {
      const periods = [];
      const end = state.selectedPeriod[0];
      let start = new Date(new Date(end).setDate(end.getDate() - getters.customPeriods.length));
      while (start < end) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },
    customPeriods(state) {
      const periods = [];
      let start = new Date(state.selectedPeriod[0]);
      while (start <= state.selectedPeriod[1]) {
        periods.push(dateToString(start));
        start.setDate(start.getDate() + 1);
      }
      return periods;
    },
    totalPrevDay(state) {
      const before = new Date(
        new Date().setFullYear(2020, new Date().getMonth(), new Date().getDate() - 1)
      );
      return state.userCounts.get(dateToString(before));
    },
    totalDay(state) {
      const before = new Date(new Date().setFullYear(2020));
      return state.userCounts.get(dateToString(before));
    },
    totalPrevWeek(state, getters) {
      return getters.prevWeekPeriods.reduce(
        (acc, cur) => acc + (state.userCounts.get(cur) || 0),
        0
      );
    },
    totalWeek(state, getters) {
      return getters.weekPeriods.reduce((acc, cur) => acc + (state.userCounts.get(cur) || 0), 0);
    },
    totalPrevMonth(state, getters) {
      return getters.prevMonthPeriods.reduce(
        (acc, cur) => acc + (state.userCounts.get(cur) || 0),
        0
      );
    },
    totalMonth(state, getters) {
      return getters.monthPeriods.reduce((acc, cur) => acc + (state.userCounts.get(cur) || 0), 0);
    },
    totalPrevCustom(state, getters) {
      return getters.prevCustomPeriods.reduce(
        (acc, cur) => acc + (state.userCounts.get(cur) || 0),
        0
      );
    },
    totalCustom(state, getters) {
      return getters.customPeriods.reduce((acc, cur) => acc + (state.userCounts.get(cur) || 0), 0);
    },
  },
  mutations: {
    changePeriod(state, payload) {
      state.selectedPeriod = payload;
    },
    changeUserCounts(state, payload) {
      state.userCounts = payload.userCounts;
    },
    addUserCounts(state, payload) {
      state.userCounts = new Map([...state.userCounts, ...payload.userCounts]);
    },
  },
  actions: {
    async fetchPeriod({ state, commit }) {
      const pervMonth = new Date(new Date().setFullYear(2020, new Date().getMonth() - 1, 1));

      const result = new Map(
        (
          await Promise.all([
            fetchPeriod(
              dateToString(
                new Date(2 * state.selectedPeriod[0].getTime() - state.selectedPeriod[1].getTime())
              ),
              dateToString(state.selectedPeriod[1])
            ),
            fetchPeriod(
              dateToString(pervMonth),
              dateToString(new Date(new Date().setFullYear(2020)))
            ),
          ])
        )
          .reduce((acc, cur) => acc.concat(cur), [])
          .map(period => [period.date, period.total_count])
      );

      commit({ type: 'addUserCounts', userCounts: result });
    },
  },
};

export default period;
