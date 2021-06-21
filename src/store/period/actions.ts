import { PeriodState_T } from './state';
import { fetchPeriod } from '@/api';
import { dateToString } from '@/utils/date';

export enum ActionTypes {
  FETCH_PERIOD = 'fetchPeriod',
}

export const actions = {
  async [ActionTypes.FETCH_PERIOD]({ state, commit }) {
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
};

export type Action_T = typeof actions;
