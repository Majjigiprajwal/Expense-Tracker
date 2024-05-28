import { createSlice } from '@reduxjs/toolkit';


const initialState = {
  id: null,
  username: null,
  email: null,
  token: null,
  isAuthenticated: false,
  isPremiumUser : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login : (state, action)=> {
    
      const { id, username, email, token, isPremiumUser} = action.payload;
      state.id = id;
      state.username = username;
      state.email = email;
      state.token = token;
      state.isAuthenticated = true;
      state.isPremiumUser = isPremiumUser;
    },
    
    logout : (state)=> {
        state.id = null;
        state.username = null;
        state.email = null;
        state.token = null;
        state.isAuthenticated = false;
        state.isPremiumUser = null;
    },

    setPremiumUser : (state,action)=> {
       state.isPremiumUser = true
       state.token = action.payload

    } 
  },
});


export const { login, logout, setPremiumUser } = authSlice.actions;

export default authSlice.reducer;

