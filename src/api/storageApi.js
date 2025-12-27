import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from '@firebase/storage';
import { storage } from './firebaseConfig';

export const uploadImage = async (folder, filename, file) => {
  try {
    const imageRef = ref(storage, `${folder}/${filename}.jpg`);
    await uploadBytes(imageRef, file);
    const imageURL = await getDownloadURL(
      ref(storage, `${folder}/${filename}.jpg`)
    );
    console.log('[上傳照片至資料庫成功]:', imageURL);
    return imageURL;
  } catch (error) {
    console.error('[上傳照片置資料庫失敗]:', error);
  }
};

export const deleteImage = async (folder, filename) => {
  try {
    const deleteRef = ref(storage, `${folder}/${filename}.jpg`);
    await deleteObject(deleteRef);
    console.log('[從資料庫刪除照片成功]');
  } catch (error) {
    console.error('[從資料庫刪除照片失敗]:', error);
  }
};
