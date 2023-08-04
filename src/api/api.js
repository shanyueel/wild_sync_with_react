import { auth, storage } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, query, updateDoc, where } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

const getRandomId = async() => {
  try{
    const docRef = await addDoc(collection(firestoreDB, "activities"),{
      id: ""
    })
    console.log("[產生ID成功]:", docRef.id)
    return docRef.id
  }catch(error){
    console.error("[產生ID失敗]:",error)
  }
}

const removeRandomId = async(activityId) => {
  try{
    await deleteDoc(doc(firestoreDB, "activities", `${activityId}`))
    console.log("[刪除ID成功]:",activityId)
  }catch(error){
    console.error("[刪除ID失敗]:",error)
  }
}

const getUserInfo = async(userId) => {
  try{
    const userInfo = await getDoc(doc(firestoreDB, 'users', `${userId}-user`))
    if(userInfo.exists()){
      console.log("[取得使用者成功]:",userInfo.data())
      return userInfo.data()
    }
  }catch(error){
    console.error("[取得使用者失敗]:",error)
  }
}

// const getActivitiesList = async() => {
//   try{
//     const activitiesRef = collection(firestoreDB, "activities")
//     const activityListQuery = query()
//     const activitiesList = await getDocs(collection(firestoreDB,"activities"))
//   }catch(error){
//     console.error("[取得所有活動失敗]:",error)
//   }
// }

const getActivity = async(activityId) => {
  try{
    const activity = await getDoc(doc(firestoreDB, 'activities', activityId))
    if(activity.exists()){
      console.log("[取得活動成功]:",activity.data())
      return activity.data()
    }
  }catch(error){
    console.log("[取得活動失敗]:",error)
  }
}

const postActivity = async(activityId, holderInfo, activityContent) => {
  try{
    await updateDoc(doc(firestoreDB, "activities",`${activityId}`),{
      ...activityContent,
      id: activityId,
      holder: holderInfo,
      attendance:[]
    })
    console.log("[新增活動成功]:",activityId)
    return activityId
  }catch(error){
    console.error("[新增活動失敗]:",error)
  }
}

const updateActivity = async(activityId, activityContent) => {
  try{
    await updateDoc(doc(firestoreDB, "activities", `${activityId}`), activityContent)
    console.log("[更新活動成功]:", activityId)
    return activityId
  }catch(error){
    console.error("[更新活動失敗]:",error)
  }
}

const alterActivityAttendance = async(userId, activityId) => {
  try{
    const activityRef = await getActivity(activityId)
    const userRef = await getUserInfo(userId)
    const existingAttendance = activityRef?.attendance
    const currentAttendedActivities = userRef?.attendedActivities

    if(existingAttendance.includes(userId)){
      const newAttendance = existingAttendance.filter((attendance)=> attendance !== userId)
      const newAttendedActivities = currentAttendedActivities.filter((activity)=>activity !== activityId)
      updateDoc(doc(firestoreDB, "activities", `${activityId}`), {
        attendance : newAttendance
      })
      updateDoc(doc(firestoreDB, "users", `${userId}-user`), {
        attendActivities: newAttendedActivities
      })
      console.log("[退出活動成功]:",activityId)
    }else{
      const newAttendance = [...existingAttendance, userId]
      const newAttendedActivities = [...currentAttendedActivities, activityId]
      updateDoc(doc(firestoreDB, "activities", `${activityId}`), {
        attendance : newAttendance
      })
      updateDoc(doc(firestoreDB, "users", `${userId}-user`),{
        attendedActivities: newAttendedActivities
      })
      console.log("[加入活動成功]:",activityId)
    }
  }catch(error){
    console.log("[加入/退出活動失敗]:", error)
  }
}

const buildUserInfo = async(userId, accountInfo) => {
  try{
    await setDoc(doc(firestoreDB, 'users', `${userId}-user`),{
      id: userId,
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


const updateUser = async(userId , updateContent) => {
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
        introduction: updateContent?.introduction,
      }, { merge:true })
      await updateProfile(auth.currentUser,{
        email: updateContent?.email,
        displayName: updateContent?.displayName,
        photoURL: updateContent?.photoURL
      })

      return {id: userId, ...updateContent}
    }
    
  }catch(error){
    console.error(error)
    return null
  }
}

const uploadImage = async(folder, filename, file)=> {
  try{
    const imageRef = ref(storage, `${folder}/${filename}.jpg`)
    await uploadBytes(imageRef, file)
    const imageURL = await getDownloadURL(ref(storage, `${folder}/${filename}.jpg`))
    console.log("[上傳照片至資料庫成功]:",imageURL)
    return imageURL
  }catch(error){
    console.error("[上傳照片置資料庫失敗]:",error)
  }
}

const deleteImage = async(folder, filename) => {
  try{
    const deleteRef = ref(storage, `${folder}/${filename}.jpg`)
    await deleteObject(deleteRef)
    console.log("[從資料庫刪除照片成功]")
  }catch(error){
    console.error("[從資料庫刪除照片失敗]:",error)
  }
  
  
}

export { getRandomId, removeRandomId, alterActivityAttendance, getUserInfo, getActivity, postActivity, updateActivity, buildUserInfo, updateUser, uploadImage, deleteImage}