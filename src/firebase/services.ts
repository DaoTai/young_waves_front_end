import { getStorage, ref, deleteObject } from "firebase/storage";
import firebase from "./config";
const storage = firebase.storage();
const storageRef = storage.ref();

export const storageImage = async (file: File): Promise<string> => {
   const imageRef = storageRef.child(`images/${file.name}`);
   const uploadTask = await imageRef.put(file);
   const downloadUrl = await uploadTask.ref.getDownloadURL();
   return downloadUrl;
};

export const storageImages = async (files: FileList): Promise<string[]> => {
   const urls: string[] = [];
   // Ko sử dụng forEach để xử lý bất đồng bộ được
   for (const file of Array.from(files)) {
      const imageRef = storageRef.child(`images/${file.name}`);
      // Upload to firebase cloud
      const uploadTask = await imageRef.put(file);
      const downloadUrl = await uploadTask.ref.getDownloadURL();
      urls.push(downloadUrl);
   }

   return urls;
};

// Xoá một ảnh trên Firebase Storage
export const deleteImage = async (imagePath: string) => {
   if (imagePath.includes("https://firebasestorage.googleapis.com")) {
      const storage = getStorage();
      // Create a reference to the file to delete
      const image = ref(storage, imagePath);
      try {
         await deleteObject(image);
      } catch (err) {
         console.error(err);
      }
   }
};

// Xoá nhiều ảnh trên Firebase Storage
export const deleteMultipleImages = async (imagePaths: string[]) => {
   for (const imagePath of imagePaths) {
      await deleteImage(imagePath);
   }
};
