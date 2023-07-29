import { auth, storage } from "api/firebaseConfig"
import { updateProfile } from "firebase/auth";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

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

const updateUser = async(userId , updateContent) => {
  try{
    if(userId || updateContent){
      
      await setDoc(doc(firestoreDB, 'users', `user-${userId}`), {
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

export { getUserInfo, updateUser, uploadImage, deleteImage}