import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "api/firebaseConfig"

const register = async({email, displayName, password}) => {
  try{
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user

    await updateProfile(auth.currentUser, {
      displayName: displayName
    })

    console.log("[Register Success]:", user);
    return {success: true, ...user};
  }catch (error){
    console.error("[Login Failed]:",error)
    return {success: false}
  }
}

const login = async ({email, password}) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    console.log("[登入成功]:",user);
    return { success: true, user }
  }catch(error){
    console.error("[登入失敗]:",error.response)
    return { success: false }
  }
}

const logout = async() => {
  try{
    await signOut(auth)
    console.log("[登出成功]")
    return {success: true}
  }catch(error){
    console.error("[登出失敗]:",error)
    return {success: false}
  }
}



export {register, login, logout}