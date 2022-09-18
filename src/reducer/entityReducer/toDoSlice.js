import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:8080/api/todos';

const initialState = {
  entities: [],
  entity: {},
  isLoading: false,
  isUpdating: false,
  updateSuccess: false,
};

export const getEntities = createAsyncThunk('toDo/getEntities', async () => {
  return axios.get(URL).then((res) => {
    return res.data;
  });
});

const toDoSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getEntities.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.isLoading = false;
      })
      .addMatcher(isPending(getEntities), (state) => {
        state.isLoading = true;
      });
  },
});

export const { reset } = toDoSlice.actions;

export default toDoSlice.reducer;