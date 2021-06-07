// import { fetchPeriod } from '@/api';

const period = {
  state: () => ({
    selectedPeriod: [new Date(new Date().getTime() - 3 * 60 * 60 * 24 * 1000), new Date()],
    userCounts: new Map(),
  }),
  getters: {
    maxUserCount(state) {
      const max = Math.max(...state.userCounts.values());
      let date;
      for (let [key, value] of state.userCounts) {
        if (value === max) {
          date = key;
          break;
        }
      }
      return { date, count: max };
    },
    totalUserCount(state) {
      return state.userCounts.values().reduce((acc, cur) => acc + cur);
    },
  },
  mutations: {
    changePeriod(state, payload) {
      state.selectedPeriod = payload.period;
    },
  },
  actions: {
    async fetchPeriod() {
      // TODO Date -> string util 필요
      // await fetchPeriod(...state.selectedPeriod);
    },
  },
};

export default period;
