import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ChatScheme } from '../types/chat';
import { Message } from '../types/chat';
import { sendMessage } from '../services/sendMessage';
import { requestChatMessages } from '../services/requestChatMessages';

const initialState: ChatScheme = {
  isLoading: false,
  message: '',
  messages: [],
  isIDExist: false,
};

export const ChatSlice = createSlice({
  name: 'Chat',
  initialState,
  reducers: {
    setChatMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
    setMessagesArray: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload; //.push(action.payload);
    },
    setChatIDExistence: (state) => {
      state.isIDExist = true; // action: PayloadAction<boolean>
    },
    clearMessage: (state) => {
      state.message = '';
    },
    clearChatData: (state) => {
      state.isIDExist = false;
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        //state.messages = action.payload;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = action.payload;
      });
    builder
      .addCase(requestChatMessages.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(requestChatMessages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.messages = action.payload;
      })
      .addCase(requestChatMessages.rejected, (state, action) => {
        state.isLoading = false;
        //state.error = action.payload;
      });
  },
});

export const {
  setChatMessage,
  clearMessage,
  setMessagesArray,
  setChatIDExistence,
  clearChatData,
} = ChatSlice.actions;
export const { reducer: ChatReducer } = ChatSlice;
