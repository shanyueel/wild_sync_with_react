import { auth } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, setDoc, where } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { asyncForEach } from "utils/asyncLoop";

export const getUser = async(userId) => {
  try{
    const userInfo = (await getDoc(doc(firestoreDB, 'users', `${userId}-user`)))?.data()
    console.log("[取得使用者成功]:",userId)
    return userInfo
  }catch(error){
    console.error("[取得使用者失敗]:",error)
  }
}

export const getUsersByIdList = async(idList) => {
  try{
    const userList = []
    asyncForEach(idList, async(userId)=>{
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

    userListSnapshot.forEach((user)=>{
      userList.push(user.data())
    })

    return userList
  }catch(error){
    console.error(error)
  }
}

export const buildUserInfo = async(userId, accountInfo) => {
  try{
    await setDoc(doc(firestoreDB, 'users', `${userId}-user`),{
      uid: userId,
      email: accountInfo?.email,
      displayName: accountInfo?.displayName,
      photoURL: "https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/avatars%2Fdefault-avatar.png?alt=media&token=9be55a06-7192-4e2b-b6b5-884cd6fece53",
      coverURL: "https://firebasestorage.googleapis.com/v0/b/wildsync.appspot.com/o/covers%2Fdefault-cover.png?alt=media&token=bd06bf50-1469-4bcb-9ec5-0e709489b159",
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
      
      await setDoc(doc(firestoreDB, 'users', `${userId}-user`), {
        email: updateContent?.email,
        displayName: updateContent?.displayName,
        photoURL: updateContent?.photoURL,
        coverURL: updateContent?.coverURL,
        profession: updateContent?.profession,
        birth: updateContent?.birth,
        region: updateContent?.region,
        introduction: updateContent?.introduction
      }, { merge:true })
      await updateProfile(auth.currentUser,{
        email: updateContent?.email,
        displayName: updateContent?.displayName,
        photoURL: updateContent?.photoURL
      })

      return {success: true, id: userId, ...updateContent}
    }
    
  }catch(error){
    console.error(error)
    return {success: false}
  }
}