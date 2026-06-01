import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  analysis: null,
};

const resultSlice = createSlice({
  name: "result",
  initialState,
  reducers: {
    setResult: (state, action) => {
      state.analysis = action.payload;
    },
    clearResult: (state) => {
        state.analysis = null
    },
  },
});

export const {setResult, clearResult} = 
resultSlice.actions

export default resultSlice.reducer