import axios from 'axios';

import { TestAsyncThunk } from 'shared/lib/tests/testAsyncThunk/testAsyncThunk';
import { requestProfileData } from './requestProfileData';

describe('requestProfileData.test', () => {
  test('happy request', async () => {
    const data = {
      username: 'admin',
      age: '22',
      city: 'Moscow',
    };

    const thunk = new TestAsyncThunk(requestProfileData);

    thunk.API.get.mockReturnValue(Promise.resolve({ data: data }));

    const result = await thunk.callThunk();

    expect(thunk.API.get).toHaveBeenCalled();

    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(data);
  });
  test('error log', async () => {
    const thunk = new TestAsyncThunk(requestProfileData);
    thunk.API.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk();

    expect(result.meta.requestStatus).toBe('rejected');
  });
});