import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  e_access_token: "",
  orgs: [],
  b_access_token: "",
  subscription: {},
  // userpermission: [],
};

export const EwaySlice = createSlice({
  name: "eway",
  initialState,
  reducers: {
    setEAccessToken: (state, action) => {
      state.e_access_token = action.payload;
    },
    setOrgs: (state, action) => {
      state.orgs = action.payload;
    },
    setBAccessToken: (state, action) => {
      state.b_access_token = action.payload;
    },
    setSubrcption: (state, action) => {
      state.subscription = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setEAccessToken, setSubrcption, setOrgs, setBAccessToken } =
  EwaySlice.actions;

export default EwaySlice.reducer;
