import { createSelector } from 'reselect';
import { State } from "../config/state";

export const selectHost = (state: State) => state.session.host;
export const selectUser = (state: State) => state.session.user;
export const selectPassword = (state: State) => state.session.password;
export const selectMin = (state: State) => state.session.min;
export const selectMax = (state: State) => state.session.max;
export const selectMessages = (state: State) => state.session.messages;
export const selectMessage = (state: State) => state.session.message;

export const selectFilteredMessages = createSelector(
  selectMin,
  selectMax,
  selectMessages,
  (min, max, messages) => {
    const isValid = min < max;
    return isValid
        ? messages
            .filter(msg => msg.value.amount >= Number(min))
            .filter(msg => msg.value.amount <= Number(max))
        : []
  }
);