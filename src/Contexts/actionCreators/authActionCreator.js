import * as types from "../actionTypes/authActionTypes";
import { getAuth, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export const loginUser = (user) => ({
  type: types.LOGIN_USER,
  payload: user,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
});

export const registerUser = (user) => ({
  type: types.REGISTER_USER,
  payload: user,
});

export const signInWithEmailAndPasswordAsync = (email, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    try {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          dispatch(loginUser(user));
          toast.success('Welcome, Login successfully', {
            position: 'top-center',
            autoClose: 2000,
          });

          resolve({ success: true });
        })
        .catch((error) => {
          toast.error('Error logging in. Please check your credentials.', {
            position: 'top-center',
            autoClose: 2000,
          });

          reject({ success: false, error: error.message });
        });
    } catch (error) {
      console.error('Error logging in:', error);
      reject({ success: false, error: error.message });
    }
  });
};

export const logoutUserAsync = () => (dispatch) => {
  try {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logoutUser());

        toast.info('Goodbye ;(', {
          position: 'top-center',
          autoClose: 2000,
        });
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  } catch (error) {
    console.error('Error logging out:', error);
  }
};


export const signUpWithEmailAndPasswordAsync = (
  email,
  password,
  firstname,
  lastname,
  role,
  profileimg,
  doctor,
  patientData,

) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      if(role == 'patient')
      {
        await setDoc(userDocRef, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          profileimg: profileimg,
          doctor: doctor,
          patientData: patientData
        });
      }
      else
      {
        await setDoc(userDocRef, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          profileimg: profileimg,
         
        });
      }
     

      await signInWithEmailAndPassword(auth, email, password);

      dispatch(loginUser(user));

      toast.success('Registration and login successful.', {
        position: 'top-center',
        autoClose: 2000,
      });

      resolve({ success: true });
    } catch (error) {
      console.error('Error registering and logging in:', error);
      toast.error('Error registering and logging in. Please check your information and try again.', {
        position: 'top-center',
        autoClose: 2000,
      });

      reject({ success: false, error: error.message });
    }
  });
};
