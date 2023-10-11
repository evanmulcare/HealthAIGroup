import * as types from "../actionTypes/fileFoldersActionTypes";
import fire from "../../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast } from "react-toastify";

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

export const createFolder = (data) => async (dispatch) => {
  try {
    const folderRef = await fire.firestore().collection("folders").add(data);
    const folderSnapshot = await folderRef.get();
    const folderData = folderSnapshot.data();
    const folderId = folderSnapshot.id; 
    const folderWithId = { ...folderData, docId: folderId }; 
    
    dispatch(addFolder(folderWithId));

    toast.success("Folder created successfully");
  } catch (error) {
    toast.error("Error creating folder");
  }
};

export const getFolders = ( category) => (dispatch) => {
  dispatch(setLoading(true));
  fire
    .firestore()
    .collection("folders")
    .where("category", "==", category) 
    .get()
    .then((folders) => {
      const foldersData = [];
      folders.forEach((folder) => {
        const folderData = folder.data();
        const folderId = folder.id; // Get the document ID
        const folderWithId = { ...folderData, docId: folderId }; // Add docId field
        foldersData.push(folderWithId);
      });
      dispatch(addFolders(foldersData));
      dispatch(setLoading(false));
    })
    .catch((error) => {
      toast.error("Error getting folders");
      dispatch(setLoading(false));
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

export const getFiles = (category) => (dispatch) => {
  fire
    .firestore()
    .collection("files")
    .where("category", "==", category) 
    .get()
    .then((files) => {
      const filesData = [];
      files.forEach((file) => {
        const fileData = file.data();
        const fileId = file.id; // Get the document ID
        const fileWithId = { ...fileData, docId: fileId }; // Add docId field
        filesData.push(fileWithId);
      });
      dispatch(addFiles(filesData));
    })
    .catch((error) => {
      toast.error("Error getting files");
    });
  }

  export const createFile = (data, setSuccess) => (dispatch) => {
    fire
      .firestore()
      .collection("files")
      .add(data)
      .then(async (file) => {
        const fileId = file.id;
        const fileData = { ...data, docId: fileId }; 
        dispatch(addFile(fileData)); 
        toast.success("File Created Successfully");
        setSuccess(true);
      })
      .catch(() => {
        setSuccess(false);
        toast.error("Error creating file");
      });
  };
  

  export const uploadFile = (file, data, setSuccess) => async (dispatch) => {
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
            dispatch(addFile({ ...fullData, docId: fileId })); // Dispatch the file data with docId
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