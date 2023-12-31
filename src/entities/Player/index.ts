import { queryUsernameByID } from './model/services/queryUsernameByID';
import { setDailySubtaskIsDone } from './model/services/daily/setDailySubtaskIsDone';
import { setSubtaskIsDone } from './model/services/tasks/setSubtaskIsDone';
import { setIsDoneDailyAPI } from 'entities/Player/model/services/setIsDoneValue';
import { updateTaskData } from 'entities/Player/model/services/updateTaskData';
import { PlayerReducer } from 'entities/Player/model/slice/playerSlice';
export {
  PlayerReducer,
  setIsDoneDailyAPI,
  updateTaskData,
  setSubtaskIsDone,
  setDailySubtaskIsDone,
  queryUsernameByID,
};
