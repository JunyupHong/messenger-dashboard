import { state } from './state';
import { mutations } from './mutations';
import { actions } from './actions';

const period = {
  namespaced: true,
  state,
  mutations,
  actions,
};

export default period;
