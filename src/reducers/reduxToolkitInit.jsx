import { configureStore } from '@reduxjs/toolkit';
import environmentSlice from './environmentSlice';


const store = configureStore({
  reducer:{
    environment: environmentSlice,
  }
})

export default store