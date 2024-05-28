import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import transactionReducer from '../slices/transactionSlice'
import categoryReducer from '../slices/categorySlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    transaction : transactionReducer,
    category : categoryReducer,
    devTools: process.env.NODE_ENV !== 'production',
  },

});

export default store;