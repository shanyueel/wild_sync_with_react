import { auth, storage } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const getUserInfo = async(userId) => {
  try{
    const userInfo = await getDoc(doc(firestoreDB, 'users', `${userId}-user`))
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

      return updateContent
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

export { getUserInfo, buildUserInfo, updateUser, uploadImage, deleteImage}