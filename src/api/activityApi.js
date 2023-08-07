import { addDoc, collection, deleteDoc, doc, updateDoc, getDoc, query, getDocs, where } from "@firebase/firestore"
import { firestoreDB } from "./firebaseConfig"
import { getUserInfo } from "./userApi"

export const getRandomId = async() => {
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

export const removeRandomId = async(activityId) => {
  try{
    await deleteDoc(doc(firestoreDB, "activities", `${activityId}`))
    console.log("[刪除ID成功]:",activityId)
  }catch(error){
    console.error("[刪除ID失敗]:",error)
  }
}

export const getActivity = async(activityId) => {
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

export const getActivitiesByIdList = async(idList) => {
  try{
    const activitiesRef = collection(firestoreDB, "activities")
    const activityListQuery = query(activitiesRef, where("id","in",idList))
    const activityListSnapshot = await getDocs(activityListQuery)
    const activityList = []
    activityListSnapshot.forEach((user)=>{
      activityList.push(user.data())
    })
    console.log("[獲取活動清單成功]",activityList)
    return activityList
  }catch(error){
    console.error("[獲取活動清單失敗]",error)
  }
}

export const postActivity = async(activityId, holderInfo, activityContent) => {
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

export const updateActivity = async(activityId, activityContent) => {
  try{
    await updateDoc(doc(firestoreDB, "activities", `${activityId}`), activityContent)
    console.log("[更新活動成功]:", activityId)
    return activityId
  }catch(error){
    console.error("[更新活動失敗]:",error)
  }
}

export const alterActivityAttendance = async(userId, activityId) => {
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