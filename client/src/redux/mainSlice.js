import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
  name: 'main',
  initialState: {
    code: "",
    input: "",            // ✅ NEW: To hold user input
    output: "",
    notes: "",
    complexity: {},
    history: [],
    complexityLoading: false,
    notesLoading: false,
  },
  reducers: {
    setCode: (state, action) => {
      state.code = action.payload;
    },
    setInput: (state, action) => {
      state.input = action.payload;
    },
    setOutput: (state, action) => {
      state.output = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    setComplexity: (state, action) => {
      state.complexity = action.payload;
    },
    setHistory: (state, action) => {
      state.history = action.payload;
    },
    setComplexityLoading: (state, action) => {
      state.complexityLoading = action.payload;
    },
    setNotesLoading: (state, action) => {
      state.notesLoading = action.payload;
    }
  }
})

// ✅ Export the new action along with existing ones
export const {
  setCode,
  setInput,             // ✅ NEW export
  setOutput,
  setNotes,
  setComplexity,
  setHistory,
  setComplexityLoading,
  setNotesLoading
} = mainSlice.actions;

export default mainSlice.reducer;
