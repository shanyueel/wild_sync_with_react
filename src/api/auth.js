import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile,EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from "firebase/auth";
import { auth } from "api/firebaseConfig"
import { updateUser } from "./userApi";

export const register = async({email, displayName, password}) => {
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

export const login = async ({email, password}) => {
  try{
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user;
    console.log("[登入成功]:",user);
    return { success: true, ...user }
  }catch(error){
    console.error("[登入失敗]:",error.response)
    return { success: false }
  }
}

export const logout = async() => {
  try{
    await signOut(auth)
    console.log("[登出成功]")
    return {success: true}
  }catch(error){
    console.error("[登出失敗]:",error)
    return {success: false}
  }
}

export const reAuth = async(password) => {
  try{
    const user = auth.currentUser
    const userCredential = EmailAuthProvider.credential(user.email, password)
    await reauthenticateWithCredential(user, userCredential)
    return {success: true, authUser: user}
  }catch(error){
    console.error("[重新驗證失敗]:", error)
    return {success: false}
  }
}

export const accountUpdate = async(userId, updateContent, currentAccount) => {
  delete updateContent?.newPasswordCheck
  if(updateContent?.newPassword === "") delete updateContent?.newPassword

  for(let updateKey in updateContent){
    if(updateContent?.[updateKey] === currentAccount?.[updateKey]) delete updateContent?.[updateKey]
    if(updateContent?.[updateKey]?.trim()?.length === 0)  delete updateContent?.[updateKey]
  }

  if(updateContent?.displayName){
    await updateProfile(auth.currentUser, {displayName: updateContent?.displayName})
    await updateUser(userId, {displayName: updateContent?.displayName})
  }
  if(updateContent?.email){
    await updateEmail(auth.currentUser, updateContent?.email)
    await updateUser(userId, {email: updateContent?.email})
  }
  if(updateContent?.newPassword){
    await updatePassword(auth.currentUser, updateContent?.newPassword)
  }
  await signOut(auth)

  return {success: true}
}