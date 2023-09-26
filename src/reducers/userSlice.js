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
    attendedActivities: [],
    heldActivities: [],
    likedActivities: []
}

const userSlice = createSlice({
  name: "user",
  initialState: initialProfile,
  reducers:{
    updateUserSlice(state,action){
      const {uid, displayName, photoURL, email, birth, coverURL, introduction, profession, region, attendedActivities, heldActivities, likedActivities} = action.payload
      return{
        ...state,
        loggedIn: true,
        uid: uid,
        email: email,
        displayName: displayName,
        photoURL: photoURL, 
        birth: birth,
        coverURL: coverURL,
        introduction: introduction,
        profession: profession,
        region: region,
        attendedActivities: attendedActivities,
        heldActivities: heldActivities,
        likedActivities: likedActivities
      }
    },
    resetUser(){
      return initialProfile
    }
  }
})

export const { updateUserSlice, resetUser } = userSlice.actions;

export default userSlice.reducer;