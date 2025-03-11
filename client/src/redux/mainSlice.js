import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    code: "",
    notes : "",
    complexity : {},
    history : [],
    output : ""
  },
  reducers: {
    setCode : (state, action) => {
        state.code = action.payload;
    },
    setNotes : (state, action) => {
        state.notes = action.payload;
    },
    setComplexity : (state, action) => {
      state.complexity = action.payload;
    },
    setHistory : (state, action) => {
      state.history = action.payload;
    },
    setOutput : (state, action) => {
      state.output = action.payload;
    }
  }
})

export const { setCode, setNotes, setComplexity, setHistory, setOutput } = mainSlice.actions
export default mainSlice.reducer