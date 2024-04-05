import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    login_status: false,
    userAllData:null
  },
  reducers: {
    setuser(state, action) {
      // console.log('state,action===========',state,action)
      state.userData = action.payload
      state.login_status = true
    },
    logout(state, action) {
      state.userData = {}
      state.login_status = false;
    },
    setuserAllData(state, action) {
      // console.log('state,action===========',state,action)
      state.userAllData = action.payload
      // state.login_status = true
    },
  }
})
export const { setuser, logout,setuserAllData } = UserSlice.actions;

export default UserSlice.reducer;