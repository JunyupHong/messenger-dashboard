import { state } from './state';
import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date';

export enum ActionTypes {
  FETCH_FIRST_DATE = 'fetchFirstDate',
  FETCH_SECOND_DATE = 'fetchSecondDate',
}

export const actions = {
  async [ActionTypes.FETCH_FIRST_DATE]({ state, commit }) {
    const result = await fetchDate(dateToString(state.firstSelectedDate));
    commit({
      type: 'changeFirstData',
      data: result,
    });
  },

  async [ActionTypes.FETCH_SECOND_DATE]({ state, commit }) {
    const result = await fetchDate(dateToString(state.secondSelectedDate));
    commit({
      type: 'changeSecondData',
      data: result,
    });
  },
};

export type Actions_T = typeof actions;
