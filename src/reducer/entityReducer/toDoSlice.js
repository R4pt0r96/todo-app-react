import { createAsyncThunk, createSlice, isPending } from '@reduxjs/toolkit';
import axios from 'axios';

const URL = 'http://localhost:8080/api/todos';

const initialState = {
  entities: [],
  entity: {},
  isLoading: false,
  isUpdating: false,
  updateSuccess: false,
  headMessage: null,
};

export const getEntities = createAsyncThunk('toDo/getEntities', async () => {
  return axios.get(URL).then((res) => {
    return res.data;
  });
});

export const saveEntity = createAsyncThunk('toDo/saveEntity', async (toDo) => {
  return axios.post(URL, toDo).then((res) => {
    return res.data;
  });
});

export const deleteEntity = createAsyncThunk('toDo/delete', async (id) => {
  return axios.delete(URL + '/' + id).then((res) => {
    return res.data;
  });
});

export const updateEntity = createAsyncThunk(
  'toDo/updateCheck',
  async (toDo) => {
    return axios.put(URL + '/save/' + toDo.id, toDo).then((res) => res.data);
  }
);

export const modifyEntity = createAsyncThunk('toDo/update', async (toDo) => {
  return axios.put(URL + '/' + toDo.id, toDo).then((res) => res.data);
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
        // state.headMessage = action.payload.headers.headMessage;
      })
      .addCase(saveEntity.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        state.entities.push(action.payload);
      })
      .addCase(deleteEntity.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.entities = state.entities.filter(
          (todo) => todo.id !== action.payload.id
        );
      })
      .addCase(updateEntity.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        for (let i = 0; i < state.entities.length; i++) {
          if (state.entities[i].id === action.payload.id) {
            state.entities[i] = action.payload;
          }
        }
      })
      .addCase(modifyEntity.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.updateSuccess = true;
        for (let i = 0; i < state.entities.length; i++) {
          if (state.entities[i].id === action.payload.id) {
            state.entities[i] = action.payload;
          }
        }
      })
      .addMatcher(isPending(getEntities), (state) => {
        state.isLoading = true;
      })
      .addMatcher(isPending(saveEntity, deleteEntity), (state) => {
        state.isUpdating = true;
      })
      .addMatcher(isPending(updateEntity, modifyEntity), (state) => {
        state.isUpdating = true;
        state.updateSuccess = false;
      });
  },
});

export const { reset } = toDoSlice.actions;

export default toDoSlice.reducer;
