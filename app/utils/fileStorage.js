import { firebase } from "../config/firebaseConfig";

export const uploadFileToFolder = async (folderRef, filename, blob) => {
  const newFileRef = folderRef.child(filename);
  await newFileRef.put(blob);
};

export const deleteAllFromFolder = async (folderRef) => {
  const files = await folderRef.listAll();
  const deletePromises = files.items.map((fileRef) => fileRef.delete());
  await Promise.all(deletePromises);
};

export const getStaticUrl = (...params) => {
  return `https://storage.googleapis.com/fintracker-51cdf.appspot.com/${params.join(
    "/"
  )}`;
};

export const getFolderRef = (folderName) => {
  return firebase.storage().ref().child(folderName);
};
