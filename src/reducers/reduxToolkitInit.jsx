import { configureStore } from '@reduxjs/toolkit';
import environmentSlice from './environmentSlice';
import userSlice from './userSlice';


const store = configureStore({
  reducer:{
    user: userSlice,
    environment: environmentSlice,
  }
})

export default store