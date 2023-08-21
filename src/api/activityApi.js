import { addDoc, collection, deleteDoc, doc, updateDoc, getDoc, getDocs, setDoc, deleteField } from "@firebase/firestore"
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
    if(activity?.holder) activity['holder'] = await getActivityHolder(activity?.holder)
    if(activity?.detail) activity['detail'] = (await getDoc(activity?.detail))?.data()
    if(activity?.transportation) activity['transportation'] = (await getDoc(activity?.transportation))?.data()
    if(activity?.accommodation) activity['accommodation'] = (await getDoc(activity?.accommodation))?.data()?.accommodationList
    console.log("[取得活動成功]:", activity)
    return activity
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

export const postActivity = async( activityId, holderReference, activityContent ) => {
  try{
    const nowTimeString = Date.parse(new Date())
    const holder = (await getDoc(holderReference))?.data()
    const mainActivityContent = {
      id: activityId,
      holder: holderReference,
      createAt: nowTimeString,
      attendance:[]
    }
    Object.keys(activityContent)?.forEach(keyName=>{
      if(!(["detail","transportation", "accommodation"].includes(keyName))){
        mainActivityContent[keyName] = activityContent?.[keyName]
      }
    })
    const detailContent = {
      id: activityId,
      ...activityContent?.detail
    }

    const transportationContent = {
      id: activityId,
      ...activityContent?.transportation
    }

    const accommodationContent = {
      id: activityId,
      accommodationList: activityContent?.accommodation
    }

    if(detailContent){
      await setDoc(doc(firestoreDB, "activities-details",`${activityId}-detail`),detailContent)
      mainActivityContent["detail"] = doc(firestoreDB, "activities-details",`${activityId}-detail`)
    }
    if(transportationContent){
      await setDoc(doc(firestoreDB, "activities-transportation",`${activityId}-transportation`),transportationContent)
      mainActivityContent["transportation"] = doc(firestoreDB, "activities-transportation",`${activityId}-transportation`)
    }
    if(accommodationContent?.accommodationList?.length > 0){
      await setDoc(doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`),accommodationContent)
      mainActivityContent["accommodation"] = doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`)
    }

    await setDoc(doc(firestoreDB, "activities", `${activityId}`), mainActivityContent)   
    await updateDoc(doc(firestoreDB, "users", `${holder?.uid}-user`),{
      heldActivities: [...holder?.heldActivities, activityId]
    })

    console.log("[新增活動成功]:",activityId)
    return { success:true, id: activityId }
  }catch(error){
    console.error("[新增活動失敗]:",error)
    return { success:false }
  }
}

export const updateActivity = async(activityId, currentActivity, updateContent) => {
  try{
    const nowTimeString = Date.parse(new Date())
    let [detailUpdate, transportationUpdate, accommodationUpdate] = [null,null,null]

    if(updateContent?.detail){
      detailUpdate = updateContent?.detail
      await updateDoc(doc(firestoreDB, "activities-details",`${activityId}-detail`), detailUpdate)
      delete updateContent?.detail
    }
    if(updateContent?.transportation){
      transportationUpdate = updateContent?.transportation
      await updateDoc(doc(firestoreDB, "activities-transportation", `${activityId}-transportation`), transportationUpdate)
      delete updateContent?.transportation
    } 

    if(updateContent?.accommodation?.length > 0){
      accommodationUpdate = {accommodationList: updateContent?.accommodation}
      if(currentActivity?.accommodation){
        await updateDoc(doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`), accommodationUpdate)
        delete updateContent?.accommodation
      }else{
        await setDoc(doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`), accommodationUpdate)
        updateContent["accommodation"] = doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`)
        console.log(updateContent)
      }
    }else if(!updateContent?.accommodation?.length > 0 || currentActivity?.accommodation){
      await deleteDoc(doc(firestoreDB, "activities-accommodation", `${activityId}-accommodation`))
      await updateDoc(doc(firestoreDB, "activities", `${activityId}`), { accommodation: deleteField() })
      delete updateContent?.accommodation
    }

    const mainUpdate = { ...updateContent, updateAt: nowTimeString }
    await updateDoc(doc(firestoreDB, "activities", `${activityId}`), mainUpdate)
  
    console.log("[更新活動成功]:", activityId)
    return { 
      success: true, 
      id: activityId, 
      mainUpdate: updateContent,
      detailUpdate: detailUpdate,
      transportationUpdate: transportationUpdate,
      accommodationUpdate: accommodationUpdate,
      updateAt: nowTimeString
    }

  }catch(error){
    console.error("[更新活動失敗]:",error)
    return { success: false }
  }
}

export const alterActivityAttendance = async(userId, activityId) => {
  try{
    const activityRef = await getActivity(activityId)
    const userRef = await getUser(userId)
    const existingAttendance = activityRef?.attendance
    const currentAttendedActivities = userRef?.attendedActivities
    const now = new Date()

    if(existingAttendance.includes(userId)){
      const newAttendance = existingAttendance.filter((attendance)=> attendance !== userId)
      const newAttendedActivities = currentAttendedActivities.filter((activity)=>activity !== activityId)
      updateDoc(doc(firestoreDB, "activities", `${activityId}`), {
        attendance : newAttendance
      })
      updateDoc(doc(firestoreDB, "users", `${userId}-user`), {
        attendedActivities: newAttendedActivities
      })
      console.log("[退出活動成功]:",activityId)
      return {success: true}
    }else{
      if(Number(activityRef?.attendance?.length) === Number(activityRef?.attendanceLimit) || Date.parse(now) > activityRef?.deadline) return {success: false}

      const newAttendance = [...existingAttendance, userId]
      const newAttendedActivities = [...currentAttendedActivities, activityId]
      updateDoc(doc(firestoreDB, "activities", `${activityId}`), {
        attendance : newAttendance
      })
      updateDoc(doc(firestoreDB, "users", `${userId}-user`),{
        attendedActivities: newAttendedActivities
      })
      console.log("[加入活動成功]:",activityId)
      return {success: true, notes: ""}
    }
  }catch(error){
    console.log("[加入/退出活動失敗]:", error)
    return {success: false}
  }
}

export const deleteActivity = async( userId, activity ) => {
  try{
    if(activity?.detail) await deleteDoc(doc(firestoreDB, "activities-details", `${activity?.id}-detail`))
    if(activity?.transportation) await deleteDoc(doc(firestoreDB, "activities-transportation", `${activity?.id}-transportation`))
    if(activity?.accommodation) await deleteDoc(doc(firestoreDB, "activities-accommodation", `${activity?.id}-accommodation`))
    await deleteDoc(doc(firestoreDB, "activities", `${activity?.id}`))
    const currentHeldActivities = (await getUser(userId))?.heldActivities
    const newHeldActivities = currentHeldActivities?.filter(heldActivity => heldActivity !== activity?.id)
    await updateDoc(doc(firestoreDB, "users", `${userId}-user`),{
      heldActivities: newHeldActivities
    })
    console.log("[刪除活動成功]:", activity?.id)
    return {success: true}
  }catch(error){
    console.error("[刪除活動失敗]:", error)
    return {success: false}
  }
}