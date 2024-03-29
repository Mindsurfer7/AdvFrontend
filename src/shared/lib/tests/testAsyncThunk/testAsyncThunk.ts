import { AsyncThunkAction } from '@reduxjs/toolkit';
import type { StateScheme } from 'App/providers/StoreProvider';
import axios, { AxiosStatic } from 'axios';

type ActionCreatorType<Return, Arg, RejectedValue> = (
  arg: Arg,
) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

jest.mock('axios');

const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  getState: () => StateScheme;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  navigate: jest.MockedFn<any>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateScheme>,
  ) {
    this.actionCreator = actionCreator;
    this.dispatch = jest.fn();
    this.getState = jest.fn(() => state as StateScheme);

    this.api = mockedAxios;
    this.navigate = jest.fn();
  }

  async callThunk(arg: Arg) {
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, {
      api: this.api,
      navigate: this.navigate,
    });

    return result;
  }
}

// type ActionCreatorType<Return, Arg, RejectedValue> = (
//   arg: Arg,
// ) => AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>;

// jest.mock('axios');

// const mockedAxios = jest.mocked(axios, true);

// export class TestAsyncThunk<Return, Arg, RejectedValue> {
//   dispatch: jest.MockedFn<any>;

//   getState: () => StateScheme;

//   API: jest.MockedFunctionDeep<AxiosStatic>;

//   navigate: jest.MockedFn<any>;

//   actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

//   constructor(actionCreator: ActionCreatorType<Return, Arg, RejectedValue>) {
//     this.actionCreator = actionCreator;
//     this.dispatch = jest.fn();
//     this.getState = jest.fn();

//     this.API = mockedAxios;
//     this.navigate = jest.fn();
//   }

//   async callThunk(arg: Arg) {
//     const action = this.actionCreator(arg);
//     const result = await action(this.dispatch, this.getState, {
//       API: this.API,
//       navigate: this.navigate,
//     });

//     return result;
//   }
// }
