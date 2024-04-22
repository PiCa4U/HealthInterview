import {storage} from '../storage';

export const getInitialState = () => {
  const state = storage.getString('NAVIGATION_STATE');
  if (!state) {
    return state;
  }
  return JSON.parse(state);
};
