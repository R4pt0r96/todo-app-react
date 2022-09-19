import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:8080/api/categories';

const initialState = {
  entities: [],
  entity: {},
  isLoading: false,
  isUpdating: false,
  updateSuccess: false,
};

export const getEntities = createAsyncThunk(
  'categories/getEntities',
  async () => {
    return axios.get(URL).then((res) => {
      return res.data;
    });
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
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

export const { reset } = categoriesSlice.actions;

export default categoriesSlice.reducer;
