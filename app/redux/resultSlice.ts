import { createSlice } from "@reduxjs/toolkit";

export type Analysis = {
  race: Record<string, number>;
  age: Record<string, number>;
  gender: Record<string, number>;
};

type ResultState = {
  analysis: Analysis | null;
}

const initialState: ResultState = {
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