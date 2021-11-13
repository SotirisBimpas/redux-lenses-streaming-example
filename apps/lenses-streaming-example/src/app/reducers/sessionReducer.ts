import { Reducer } from 'redux'

import { SessionState } from "../config/state"
import { Action } from "../actions"

export const INITIAL_STATE: SessionState = {
  heartbeatCount: 0,
  messages: [],
  host: '',
  user: '',
  password: '',
  min: '',
  max: '',
  filteredMessages: []
};

export const sessionReducer: Reducer<SessionState, Action> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_HOST':
      return { ...state, host: action.payload };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    case 'CLEAR_MESSAGES':
      return { ...state, messages: [] };
    case 'SHOW_ROW_DETAILS':
      return { ...state, message: action.payload };
    case 'MESSAGE_RECEIVED': {
      const { amount } = action.payload.value; 
      const min = Number(state.min);
      const max = Number(state.max);
      const newFilteredMessages = [...state.filteredMessages];
      if(min && max && amount >= min && amount <= max) newFilteredMessages.push(action.payload);
      return {
        ...state,
        messages: [...state.messages, action.payload],
        filteredMessages: newFilteredMessages
      };
    }
    case "UPDATE_MIN": {
      const min = Number(action.payload);
      const max = Number(state.max);
      const isValid = min < max;
      return {
        ...state,
        min: action.payload,
        filteredMessages: isValid 
          ? state.messages.filter(msg => msg.value.amount >= min).filter(msg => msg.value.amount <= max)
          : []
      };
    }
    case "UPDATE_MAX": {
      const max = Number(action.payload);
      const min = Number(state.min);
      const isValid = min < max;
      return {
        ...state,
        max: action.payload,
        filteredMessages: isValid
          ? state.messages.filter(msg => msg.value.amount >= min).filter(msg => msg.value.amount <= max)
          : []
      };
    }
    default:
      return state;
  }
}