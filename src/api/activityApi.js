import { addDoc, collection, deleteDoc, doc, updateDoc, getDoc, getDocs, setDoc, deleteField, where, query, orderBy } from "@firebase/firestore"
import { firestoreDB } from "./firebaseConfig"
import { getUser } from "./userApi"
import { asyncForEach } from "utils/asyncLoop"

import taiwanDistricts from 'data/taiwanDistricts.json'

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

export const getOrderedActivities = async( orderType ) => {
  try{
    let orderQuery
    const nowTimestamp = Date.parse(new Date())

    switch (orderType) {
      case "releaseDate":
        orderQuery = query(collection(firestoreDB, "activities"), orderBy("createAt", "desc"));
        break;
      case "activityDate":
        orderQuery = query(collection(firestoreDB, "activities"), where("time.start", ">", nowTimestamp), orderBy("time.start"));
        break;
      case "deadlineDate":
        orderQuery = query(collection(firestoreDB, "activities"), where("deadline", ">", nowTimestamp), orderBy("deadline"));
        break;
      default:
        orderQuery = query(collection(firestoreDB, "activities"), orderBy("createAt", "desc"));
        break;
    }

    const orderedActivitiesIdList = (await getDocs(orderQuery))?.docs?.map(doc=> doc?.data()?.id)
    console.log("[排序活動列表成功]:", orderedActivitiesIdList)
    return orderedActivitiesIdList
    
  }catch(error){
    console.error("[排序活動列表失敗]:", error)
  }
}

export const getActivitiesByTimeFilter = async(timeFilter) => {
  try{
    let timeFilteredIdList = []

    const startQuery = timeFilter?.start
      ? query(collection(firestoreDB, "activities"), where('time.start', ">=", timeFilter?.start ))
      : null
    const endQuery = timeFilter?.end
      ? query(collection(firestoreDB, "activities"), where("time.end", "<=", timeFilter?.end))
      : null

    if(startQuery && endQuery){
      const startSnapshot = await getDocs(startQuery)
      const startIdList = startSnapshot?.docs?.map(doc=> doc?.data()?.id)
      const endSnapshot = await getDocs(endQuery)
      const endIdList = endSnapshot?.docs?.map(doc=> doc?.data()?.id)
      timeFilteredIdList = endIdList.filter((id)=> startIdList.includes(id))
    }else if(startQuery){
      const startSnapshot = await getDocs(startQuery)
      timeFilteredIdList = startSnapshot?.docs?.map(doc=> doc?.data()?.id)
    }else if(endQuery){
      const endSnapshot = await getDocs(endQuery)
      timeFilteredIdList = endSnapshot?.docs?.map(doc=> doc?.data()?.id)
    }

    console.log("[活動時間篩選成功]:" ,timeFilteredIdList)
    return timeFilteredIdList
  }catch(error){
    console.error("[活動期間篩選失敗]:", error)
  }
}

export const getActivitiesByFilters = async(filters) => {
  try{
    let filteredActivitiesIdList = []

    const orderedActivitiesIdList = await getOrderedActivities(filters?.order)
    filteredActivitiesIdList = orderedActivitiesIdList

    if(filters?.time){
      const timeFilteredIdList = await getActivitiesByTimeFilter(filters?.time)
      filteredActivitiesIdList = filteredActivitiesIdList?.filter(id=> timeFilteredIdList?.includes(id))
    }
    
    if(filters?.location?.length > 0){
      const locationQuery = query(collection(firestoreDB, "activities"), where("location.county", "in", filters?.location))
      const locationFilteredIdList = (await getDocs(locationQuery))?.docs?.map(doc=>doc?.data()?.id)
      filteredActivitiesIdList = filteredActivitiesIdList?.filter(id => locationFilteredIdList?.includes(id))
    }

    if(filters?.difficulty?.length > 0){
      const difficultyQuery = query(collection(firestoreDB, "activities"), where("difficulty", "in", filters?.difficulty))
      const difficultyFilteredIdList = (await getDocs(difficultyQuery))?.docs?.map(doc=>doc?.data()?.id)
      filteredActivitiesIdList = filteredActivitiesIdList?.filter(id => difficultyFilteredIdList?.includes(id))
    }

    if(filters?.keyword){
      const newFilteredActivitiesIdList = []

      await asyncForEach(filteredActivitiesIdList, async(activityId)=>{
        const name = (await getDoc(doc(firestoreDB, "activities", activityId)))?.data()?.name?.toLowerCase()
        const detail = (await getDoc(doc(firestoreDB, "activities-details",  `${activityId}-detail`)))?.data()
        const departurePoint = detail?.departurePoint?.detail?.toLowerCase()
        const belongingPark = detail?.belongingPark?.toLowerCase()
        const targetFields = `${name} ${departurePoint} ${belongingPark}`
        
        if(targetFields?.includes( filters?.keyword?.toLowerCase() )){
          newFilteredActivitiesIdList?.push(activityId)
          console.log(newFilteredActivitiesIdList)
        }
      })

      filteredActivitiesIdList = newFilteredActivitiesIdList
    }
    const filteredActivities = await getActivitiesByIdList(filteredActivitiesIdList)
    return filteredActivities
  }catch(error){
    console.error()
  }
}

export const getPopularLocations = async() => {
  try{
    const locationsOrdersQuery = query(collection(firestoreDB,"activities"), orderBy("location.county"))
    const activitiesLocations = (await getDocs(locationsOrdersQuery))?.docs?.map(doc=>doc?.data()?.location?.county)
    
    const countiesCounts = activitiesLocations?.reduce((countiesCounts, activityCounty)=>{
      if(activityCounty in countiesCounts){
        countiesCounts[activityCounty]++
      }else{
        countiesCounts[activityCounty] = 1
      }

      return countiesCounts
    },{})

    const countiesCountsArray = Object.entries(countiesCounts)
    countiesCountsArray?.sort((a,b) =>b[1] - a[1])
    const countiesCountsResult = countiesCountsArray.map(county=> county[0])

    const popularLocations = countiesCountsResult.map(county=> taiwanDistricts.find(taiwanCounty => taiwanCounty.id === county)).slice(0,6)

    console.log("[取得熱門活動地點成功]:", popularLocations)
    return popularLocations

  }catch(error){
    console.error("[取得熱門活動地點失敗]:",error)
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
    await updateDoc(doc(firestoreDB, "users", `${holder?.uid}`),{
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
      updateDoc(doc(firestoreDB, "users", `${userId}`), {
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
      updateDoc(doc(firestoreDB, "users", `${userId}`),{
        attendedActivities: newAttendedActivities
      })
      console.log("[加入活動成功]:",activityId)
      return {success: true, notes: ""}
    }
  }catch(error){
    console.error("[加入/退出活動失敗]:", error)
    return {success: false}
  }
}

export const removeAttendance = async(activity, removeAttendanceId ) => {
  try{
    const activityId = activity?.id
    const userRef = await getUser(removeAttendanceId)
    const oldAttendance = activity?.attendance
    const newAttendance = oldAttendance?.filter(attendance=> attendance !== removeAttendanceId)
    const oldAttendedActivities = userRef?.attendedActivities
    const newAttendedActivities = oldAttendedActivities?.filter(attendedActivity=> attendedActivity !== activityId)

    await updateDoc(doc(firestoreDB,"activities", activityId),{
      attendance: newAttendance
    })
    await updateDoc(doc(firestoreDB, "users", removeAttendanceId),{
      attendedActivities: newAttendedActivities
    })
    
    console.log("[移除參與者成功]:",removeAttendanceId)
    return {success:true, newAttendance: newAttendance}
  }catch(error){
    console.error("[移除參與者失敗]:",error)
    return {success:false}
  }
}

export const alterActivityLiked = async(userId, activityId) => {
  try{
    const userRef = await getUser(userId)
    const currentLikedActivities = userRef?.likedActivities

    if(!currentLikedActivities?.includes(activityId)){
      const newLikedActivities = [
        ...currentLikedActivities,
        activityId
      ]
      await updateDoc(doc(firestoreDB, "users", `${userId}`),{
        likedActivities: newLikedActivities
      })
      console.log("[收藏活動成功]:", activityId)
      return {success: true}
    }else{
      const newLikedActivities = currentLikedActivities?.filter((activity) => activity !== activityId )
      await updateDoc(doc(firestoreDB, "users", `${userId}`),{
        likedActivities: newLikedActivities
      })
      console.log("[取消收藏活動成功]:", activityId)
      return {success: true}
    }
  }catch(error){
    console.error("[收藏 / 取消收藏活動失敗]:", error)
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
    await updateDoc(doc(firestoreDB, "users", `${userId}`),{
      heldActivities: newHeldActivities
    })
    console.log("[刪除活動成功]:", activity?.id)
    return {success: true}
  }catch(error){
    console.error("[刪除活動失敗]:", error)
    return {success: false}
  }
}