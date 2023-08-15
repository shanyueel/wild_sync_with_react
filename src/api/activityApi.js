import { addDoc, collection, deleteDoc, doc, updateDoc, getDoc, query, getDocs, where, setDoc } from "@firebase/firestore"
import { firestoreDB } from "./firebaseConfig"
import { getUser } from "./userApi"
import { asyncForEach } from "utils/asyncLoop"

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
    const activity = (await getDoc(doc(firestoreDB, 'activities', activityId)))?.data()
    const holder = await getActivityHolder(activity?.holder)
    const detail = (await getDoc(activity?.detail))?.data()
    const transportation = (await getDoc(activity?.transportation))?.data()
    const accommodation = (await getDoc(activity?.transportation))?.data()

    console.log("[取得活動成功]:", activityId)
    return {
      ...activity, 
      holder: holder,
      detail: detail || null,
      transportation: transportation || null,
      accommodation: accommodation|| null 
    }

  }catch(error){
    console.error("[取得活動失敗]:",error)
  }
}

export const getActivityHolder = async(holderReference) => {
  try{
    const holder = (await getDoc(holderReference))?.data()
    delete holder?.attendedActivities
    delete holder?.email
    delete holder?.coverURL
    delete holder?.likedActivities

    console.log("[取得主辦人成功]:", holder?.uid)
    return holder

  }catch(error){
    console.error("[取得主辦人失敗]:",error)
  }
}

export const getAllActivities = async() => {
  try{
    const allActivitiesIdList = []
    const allActivitiesSnapshot = await getDocs(collection(firestoreDB, "activities"))
    allActivitiesSnapshot.forEach(activity => allActivitiesIdList.push(activity?.data()?.id))
    const allActivities = await getActivitiesByIdList(allActivitiesIdList)
    return allActivities
  }catch(error){
    console.log(error)
  }
}

export const getActivitiesByIdList = async(idList) => {
  try{
    const activityList = []
    await asyncForEach(idList, async(activityId)=>{
      const activity = await getActivity(activityId)
      activityList.push(activity)
    })
    console.log("[獲取活動清單成功]",activityList)
    return activityList
  }catch(error){
    console.error("[獲取活動清單失敗]",error)
  }
}

export const postActivity = async( activityId, holderInfo, activityContent ) => {
  try{
    const nowTimeString = Date.parse(new Date())
    await updateDoc(doc(firestoreDB, "activities", `${activityId}`),{
      ...activityContent,
      id: activityId,
      holder: holderInfo,
      createAt: nowTimeString,
      attendance:[]
    },{merge: true})
    await updateDoc(doc(firestoreDB, "users", `${holderInfo.uid}-user`),{
      heldActivities: [...holderInfo.heldActivities, activityId]
    })
    console.log("[新增活動成功]:",activityId)
    return {success:true, id: activityId}
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
    const userRef = await getUser(userId)
    const existingAttendance = activityRef?.attendance
    const currentAttendedActivities = userRef?.attendedActivities

    if(existingAttendance.includes(userId)){
      const newAttendance = existingAttendance.filter((attendance) => attendance !== userId)
      const newAttendedActivities = currentAttendedActivities.filter((activity) => activity !== activityId)
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