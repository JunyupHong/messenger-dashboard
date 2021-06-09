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
