import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'https://todo-backend-five-plum.vercel.app';

export const getAllToDos = createAsyncThunk('todo/getAllToDos', async () => {
  try {
    const res = await axios({ method: 'GET', url });
    return await res.data;
  } catch (err) {
    return Promise.reject(err);
  }
});

export const deleteToDo = createAsyncThunk(
  'todo/deleteToDo',
  async (action) => {
    try {
      const _id = action;

      const res = await axios({
        method: 'DELETE',
        url: `${url}/delete`,
        data: { _id },
      });
      return await res.data;
    } catch (err) {
      return Promise.reject(err);
    }
  }
);
export const addToDo = createAsyncThunk('todo/addToDo', async (action) => {
  try {
    const text = action;
    const res = await axios({
      method: 'POST',
      url: `${url}/save`,
      data: { text },
    });
    return await res.data;
  } catch (err) {
    return Promise.reject(err);
  }
});
export const editToDo = createAsyncThunk('todo/editToDo', async (action) => {
  try {
    const { _id, inputText } = action;

    const res = await axios({
      method: 'PUT',
      url: `${url}/update`,
      data: { _id, text: inputText },
    });
    return await res.data;
  } catch (err) {
    return Promise.reject(err);
  }
});

const initialState = {
  toDos: [],
  inputText: '',
  isLoading: false,
};

const toDoSlice = createSlice({
  name: 'toDo',
  initialState,
  reducers: {
    setInputText: (state, { payload }) => {
      state.inputText = payload;
    },
    setLoading: (state, { payload }) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllToDos.fulfilled, (state, action) => {
      state.toDos = action.payload;
    });
    builder.addCase(getAllToDos.rejected, () => {
      console.log('rejected');
    });

    builder.addCase(deleteToDo.fulfilled, ({ payload }) => {
      console.log(payload);
    });
    builder.addCase(deleteToDo.rejected, () => {
      console.log('rejected');
    });

    builder.addCase(addToDo.fulfilled, ({ payload }) => {
      console.log(payload);
    });
    builder.addCase(addToDo.rejected, () => {
      console.log('rejected');
    });

    builder.addCase(editToDo.fulfilled, (state, { payload }) => {
      console.log(payload);
    });

    builder.addCase(editToDo.rejected, () => {
      console.log('rejected');
    });
  },
});

export const { setInputText, setLoading } = toDoSlice.actions;

export default toDoSlice.reducer;
