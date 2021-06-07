const date = {
  state: () => ({
    period: [new Date().getTime() - 3 * 60 * 60 * 24 * 1000, new Date()],
  }),
  mutations: {
    changePeriod(state, payload) {
      state.period = payload.period;
    },
  },
};

export default date;
