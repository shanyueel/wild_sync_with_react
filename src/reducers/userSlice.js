import { createSlice } from "@reduxjs/toolkit";

const initialProfile = {
    id: 0,
    account: "",
    email: "",
    name: "",
    age: 0,
}

const userSlice = createSlice({
  name: "user",
  initialState: initialProfile,
  reducers:{
    setLogin(state,action){
      const { id, account, email, name, age } = action.payload;
      state.value = {
        id,
        account,
        email,
        name,
        age
      }
    },
    setLogout(state){
      state.value = initialProfile;
    }
  }
})

export const { setLogin, setLogout } = userSlice.actions;

export default userSlice.reducer;