import { StateScheme } from 'App/providers/StoreProvider';

export const getGoogleProfile = (state: StateScheme) => {
  return state.GoogleProfile?.account;
};
export const getGoogleData = (state: StateScheme) => {
  return state.GoogleProfile;
};
export const getGoogleIsLogged = (state: StateScheme) => {
  return state.GoogleProfile.isLogged;
};
export const getGoogleID = (state: StateScheme) => {
  return state.GoogleProfile.account?.uid;
};