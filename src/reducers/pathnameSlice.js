import { createSlice } from "@reduxjs/toolkit";

const initialPathname = {
  pathname: '/'
}

const pathnameSlice = createSlice({
  name: 'pathname',
  initialState: initialPathname,
  reducers:{
    setPathname(state){
      state.pathname = window.location.pathname
    }
  }
  
})

export const { setPathname } = pathnameSlice.actions;

export default pathnameSlice.reducer