import { configureStore } from '@reduxjs/toolkit';
import toDoReducer from './entityReducer/toDoSlice';
import categoryReducer from './entityReducer/categorySlice';

const store = configureStore({
  reducer: {
    toDo: toDoReducer,
    category: categoryReducer,
  },
});

export default store;
