import { auth } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, deleteDoc } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { asyncForEach } from "utils/asyncLoop";
import defaultImageURL from 'data/defaultImageURL.json'

export const getUser = async(userId) => {
  try{
    const userInfo = (await getDoc(doc(firestoreDB, 'users', `${userId}`)))?.data()
    console.log("[取得使用者成功]:",userInfo)
    return userInfo
  }catch(error){
    console.error("[取得使用者失敗]:",error)
  }
}

export const getUsersByIdList = async(idList) => {
  try{
    const userList = []
    await asyncForEach(idList, async(userId)=>{
      const user = await getUser(userId)
      userList?.push(user)
    })
    console.log("[獲取使用者清單成功]",userList)
    return userList
  }catch(error){
    console.error("[獲取使用者清單失敗]",error)
  }
}

export const getPopularUsersList = async() => {
  try{
    const usersRef = collection(firestoreDB, "users")
    const userListQuery = query(usersRef, orderBy("heldActivities", "desc"), limit(10))
    const userListSnapshot = await getDocs(userListQuery)
    const userList = []

    userListSnapshot?.forEach((user)=>{
      userList?.push(user?.data())
    })

    return userList
  }catch(error){
    console.error(error)
  }
}

export const buildUser = async(userId, accountInfo) => {
  try{
    await setDoc(doc(firestoreDB, 'users', `${userId}`),{
      uid: userId,
      role: "user",
      email: accountInfo?.email,
      displayName: accountInfo?.displayName,
      photoURL: defaultImageURL?.userAvatar,
      coverURL: defaultImageURL?.userCover,
      profession: "登山人",
      birth: null,
      region: "以山為家",
      introduction: "大家好！我是山林探險家，喜歡攀登高峰，感受山川的氣息。期待在Wild Sync認識志同道合的山友，一起探索未知的頂峰！",
      heldActivities:[],
      attendedActivities:[],
      likedActivities:[]
    })
    console.log("[初始化使用者資料成功]:",accountInfo)
    return { success: true, accountInfo }
  }catch(error){
    console.log("[初始化使用者資料失敗]:",error)
  }
}

export const updateUser = async(userId, updateContent) => {
  try{
    if(userId || updateContent){
      const updateDocContent = {}
      const updateProfileContent= {}

      for(let updateKey in updateContent){
        updateDocContent[updateKey] = updateContent[updateKey]
        const updateProfileFilter = ["email", "displayName", "photoURL"]
        if(updateProfileFilter.includes(updateKey)) updateProfileContent[updateKey] = updateContent[updateContent]
      }
      
      await setDoc(doc(firestoreDB, 'users', `${userId}`), updateDocContent, { merge:true })
      await updateProfile(auth.currentUser, updateProfileContent)

      return {success: true}
    }
    
  }catch(error){
    console.error(error)
    return {success: false}
  }
}

export const renameUsersDocument = async() => {
  try{
    const usersData = (await getDocs(collection(firestoreDB, "users"))).docs.map(doc=> doc.data())
    await asyncForEach(usersData, async(userData) => {
      console.log(userData)
      await setDoc(doc(firestoreDB, "users", `${userData?.uid}`), userData, {merge: true})
      await deleteDoc(doc(firestoreDB, "users", `${userData?.uid}-user`))
    })
    console.log("[使用者檔案更名完成]")
  }catch(error){
    console.error("[使用者檔案更名失敗]:",error)
  }
}