import { createSlice } from "@reduxjs/toolkit";

const adminLoginSlice = createSlice({
  name:'auth',
  initialState:{
    use:null,
    error:null,
    loading:false,
  },
  reducers:{
    setAdminUser:(state, action) => {
      state.user = action.payload;
      state.isAuthentication = true;
    }, setAdminError:(state, action) => {
      state.error = action.payload;
    },
    setAdminLoading:(state, action) => {
      state.loading = action.payload;
    },
  },


})

export const {setAdminUser, setAdminLoading, setAdminError} = adminLoginSlice.actions;
export default adminLoginSlice.reducer;