import { State_T } from './state';
import { fetchDate } from '@/api';
import { dateToString } from '@/utils/date';
import { ActionTree, Commit } from 'vuex';
import { RootState } from '../types';

export enum ActionTypes {
  FETCH_FIRST_DATE = 'fetchFirstDate',
  FETCH_SECOND_DATE = 'fetchSecondDate',
}

export const actions = {
  async [ActionTypes.FETCH_FIRST_DATE]({ state, commit }: { state: State_T; commit: Commit }) {
    const result = await fetchDate(dateToString(state.firstSelectedDate));
    commit({
      type: 'changeFirstData',
      data: result,
    });
  },

  async [ActionTypes.FETCH_SECOND_DATE]({ state, commit }: { state: State_T; commit: Commit }) {
    if (!state.secondSelectedDate) return;

    const result = await fetchDate(dateToString(state.secondSelectedDate));
    commit({
      type: 'changeSecondData',
      data: result,
    });
  },
};

export type Actions_T = typeof actions;
