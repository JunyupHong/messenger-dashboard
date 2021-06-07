const date = {
  state: () => ({
    firstDate: new Date(),
    secondDate: null,
  }),
  mutations: {
    changeDate(state, payload) {
      state.firstDate = payload.date[0];
      state.secondDate = payload.date[1];
    },
  },
};

export default date;
