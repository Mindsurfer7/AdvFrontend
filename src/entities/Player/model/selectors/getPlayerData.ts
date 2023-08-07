import { StateScheme } from 'App/providers/StoreProvider';

export const getPlayerProfile = (state: StateScheme) => {
  return state.Player.PlayerData;
};
export const getPlayerPoints = (state: StateScheme) => {
  return state.Player.PlayerData.points;
};
export const getPlayerLevel = (state: StateScheme) => {
  return state.Player.PlayerData.level;
};
export const getHabits = (state: StateScheme) => {
  return state.Player.habits;
};
export const getFilteredHabits = (state: StateScheme) => {
  return state.Player.filteredHabits;
};
export const getFilteredTasks = (state: StateScheme) => {
  return state.Player.filteredTasks;
};
export const getFilteredDaily = (state: StateScheme) => {
  return state.Player.filteredDaily;
};
export const getTasks = (state: StateScheme) => {
  return state.Player.tasks;
};
export const getDailys = (state: StateScheme) => {
  return state.Player.daily;
};
export const getPlayerDataError = (state: StateScheme) => {
  return state.Player.error;
};
export const getCompletedTasks = (state: StateScheme) => {
  return state.Player.completedTasks;
};
export const getAllTags = (state: StateScheme) => {
  return state.Player.allTags;
};
export const getIsFilterApplied = (state: StateScheme) => {
  return state.Player.isFilterApplied;
};
