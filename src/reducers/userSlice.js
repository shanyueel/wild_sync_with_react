import { createSlice } from "@reduxjs/toolkit";

const initialProfile = {
    loggedIn: false,
    uid: null,
    email: "",
    displayName: "訪客",
    photoURL: "",
    coverURL: "",
    profession: "",
    birth: null,
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
    initUser(state,action){
      const { uid, email, displayName, photoURL } = action.payload
      
      return {
        ...state,
        loggedIn: true,
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL
      }

    },
    resetUser(){
      return initialProfile
    },
    updateInfo(state,action){
      const {birth, coverURL, introduction, profession, region} = action.payload

      return{
        ...state,
        birth: birth,
        coverURL: coverURL,
        introduction: introduction,
        profession: profession,
        region: region
      }
    }
  }
})

export const { initUser, resetUser, updateInfo } = userSlice.actions;

export default userSlice.reducer;