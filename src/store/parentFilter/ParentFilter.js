import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggle: "",
  manifest_tab: 1,
  runsheet_tab: 1,
};

export const parentFilterSlice = createSlice({
  name: "parentFilter",
  initialState,
  reducers: {
    setToggle: (state, action) => {
      state.toggle = action.payload;
    },
    setManifestTab: (state, action) => {
      state.manifest_tab = action.payload;
    },
    setRunsheetTab: (state, action) => {
      state.runsheet_tab = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setToggle, setManifestTab, setRunsheetTab } =
  parentFilterSlice.actions;

export default parentFilterSlice.reducer;
