import { doc, setDoc } from "@firebase/firestore";
import { firestoreDB } from "./firebaseConfig";

const updateUserInfo = async(userId, userInfo) => {
  try{
    await setDoc(doc(firestoreDB, "users", `user-${userId}`), userInfo,{merge:true})
    console.log("[更新資料成功]:")
  }catch(error){
    console.error("[更新資料失敗]:",error)
  }
  
}

export {updateUserInfo}