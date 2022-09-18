import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './entityReducer/toDoSlice';

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
  },
});

export default store;
