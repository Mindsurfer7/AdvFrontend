import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'App/providers/StoreProvider';
import { collection, getDocs } from 'firebase/firestore';
import { GPT_DB } from 'App/API/firebaseAPI';
import { getGoogleID } from 'entities/GoogleProfile/model/selectors/getGoogleProfile';

export const requestCompleted = createAsyncThunk<any, void, ThunkConfig<any>>(
  'Player/requestCompleted',
  async (_, thunkAPI) => {
    const userID = getGoogleID(thunkAPI.getState());
    const accountsRef = collection(GPT_DB, 'accounts');

    try {
      const response = await getDocs(accountsRef);

      const filteredResponse = response.docs
        .map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
        .filter((c) => c.id === userID);

      if (!response) {
        throw new Error();
      }
      //@ts-ignore
      return filteredResponse[0].completed;
    } catch (e) {
      console.log(e);
      return thunkAPI.rejectWithValue('error');
    }
  },
);
