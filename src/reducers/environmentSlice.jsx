import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  windowSize: null,
}

const environmentSlice = createSlice({
  name: "environment",
  initialState: initialState,
  reducers: {
    setWindowSize( state,action ){
      const { windowWidth } = action.payload;

      switch(true){
        case (windowWidth < 768):
          state.windowSize = "small";
          break;
        case (windowWidth >= 768 && windowWidth < 1024):
          state.windowSize = "medium";
          break;
        case (windowWidth >= 1024):
          state.windowSize = "large";
          break;
        default:
          state.windowSize = null;
          break;
      }
    }
  },
})

export const { setWindowSize } = environmentSlice.actions;

export default environmentSlice.reducer; 
