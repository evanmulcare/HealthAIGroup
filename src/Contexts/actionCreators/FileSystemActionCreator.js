import * as types from "../actionTypes/FileSystemActionTypes";
import fire from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from "react-toastify";

const createFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const createFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

const getFolders = (payload) => ({
  type: types.GET_FOLDERS,
  payload,
});

const getFiles = (payload) => ({
  type: types.GET_FILES,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

export const getFoldersFunction = (category) => (dispatch) => {
  fire
    .firestore()
    .collection("folders")
    .where("category", "==", category) 
    .get()
    .then((folders) => {
      const foldersData = [];
      folders.forEach((folder) => {
        const folderData = folder.data();
        const folderId = folder.id; 
        const folderWithId = { ...folderData, docId: folderId }; 
        foldersData.push(folderWithId);
      });
      dispatch(getFolders(foldersData));
    })
    .catch((error) => {
      toast.error("Error getting folders");
    });
};

export const getFilesFunction = (category) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("category", "==", category) 
    .get()
    .then((files) => {
      const filesData = [];
      files.forEach((file) => {
        const fileData = file.data();
        const fileId = file.id; 
        const fileWithId = { ...fileData, docId: fileId }; 
        filesData.push(fileWithId);
      });
      dispatch(getFiles(filesData));
    })
    .catch((error) => {
      toast.error("Error getting files");
    });
  }

export const createFolderFunction = (data) => async (dispatch) => {
  try {
    const folderRef = await fire.firestore().collection("folders").add(data);
    const folderSnapshot = await folderRef.get();
    const folderData = folderSnapshot.data();
    const folderId = folderSnapshot.id; 
    const folderWithId = { ...folderData, docId: folderId }; 
    
    dispatch(createFolder(folderWithId));

    toast.success("Folder created successfully");
  } catch (error) {
    toast.error("Error creating folder");
  }
};

export const createFileFunction = (file, data, setSuccess) => async (dispatch) => {
  const storage = getStorage(fire);
  const uploadFileRef = ref(storage, `files/${data?.category}/${data?.name}`);
  const uploadTask = uploadBytesResumable(uploadFileRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
        toast.info(`Uploading File: ${progress}%`);
    },
    (error) => {
      console.log(error);
      toast.error("Error uploading file");
    },
    async () => {
      try {
        const fileUrl = await getDownloadURL(uploadTask.snapshot.ref);
        const fullData = { ...data, url: fileUrl };

        fire.firestore().collection("files").add(fullData).then(async (file) => {
          const fileId = file.id;
          dispatch(createFile({ ...fullData, docId: fileId })); 
          toast.success("File Uploaded successfully");
          setSuccess(true);
        }).catch(() => {
          setSuccess(false);
          toast.error("Error uploading file");
        });
      } catch (error) {
        console.log(error);
        toast.error("Error uploading file");
      }
    }
  );
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};