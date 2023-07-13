import { createSlice } from "@reduxjs/toolkit";

const initialProfile = {
    id: null,
    email: "",
    displayName: "",
    avatar: "",
    image: "",
    age: null,
    profession: "",
    birth: "",
    region: "",
    introduction: "",
    role: "user",
    attendance: [],
    createAt: null,
    updateAt: null
}

const userSlice = createSlice({
  name: "user",
  initialState: initialProfile,
  reducers:{
    // setLogin(state,action){
    //   // const { id, account, email, name, age } = action.payload;
    //   state.value = {
    //     ...action.payload
    //   }
    // },
    // setLogout(state){
    //   state.value = initialProfile;
    // },
    setCurrentUser(state,action){
      state = { 
                ...state,
                ...action.payload
              }
    }
  }
})

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;