import { auth } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";

const getUserInfo = async(userId) => {
  try{
    const userInfo = await getDoc(doc(firestoreDB, 'users', `user-${userId}`))
    if(userInfo.exists()) return userInfo.data()
  }catch(error){
    console.error(error)
  }
}

const postNewActivity = async() => {
  try{

  }catch(error){

  }
}

// const updateUserInfo = async(userId, userInfo) => {
//   try{
//     await setDoc(doc(firestoreDB, 'users', `user-${userId}`), userInfo, { merge:true })
//     console.log("[更新使用者資料成功]:",userInfo)
//     return userInfo
//   }catch(error){
//     console.error("[更新使用者資料失敗]:",error)
//     return null
//   }
// }

// const updateUserAccount = async ( updateContent ) => {
//   try{
//     await updateProfile(auth.currentUser,updateContent)
//     console.log("[更新使用者帳戶成功]:",updateContent)
//     return {success: true, ...updateContent}
//   }catch(error){
//     console.error("[更新使用者帳戶失敗]:",error)
//     return  {success: false}
//   }

// }

const updateUser = async(userId , updateContent) => {
  try{
    if(userId || updateContent){
      await setDoc(doc(firestoreDB, 'users', `user-${userId}`), {
        // coverURL: updateContent?.coverURL,
        profession: updateContent?.profession,
        birth: updateContent?.birth,
        region: updateContent?.region,
        introduction: updateContent?.introduction,
      }, { merge:true })
      await updateProfile(auth.currentUser,{
        email: updateContent?.email,
        displayName: updateContent?.displayName,
        // photoURL: updateContent?.photoURL
      })

      return updateContent
    }
    
  }catch(error){
    console.error(error)
    return null
  }
}

export { getUserInfo, updateUser}