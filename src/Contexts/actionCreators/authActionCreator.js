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

//Handle user login
//Promise used to easily handle success / failure with resolve and reject, if it is rejected the user wont be redirected to dashboard
export const signInWithEmailAndPasswordAsync = (email, password, userData) => (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const currentUserData = userData.find((data) => data.docId === user.uid);
      const role = currentUserData?.role;

      if (role === 'doctor') {
        dispatch(loginUser(user));
        resolve({ success: true, user });
      } else {
        toast.error('Patients cannot access the Web resources.', {
          position: 'top-center',
          autoClose: 2000,
        });

        reject({ success: false });
      }
    } catch (error) {
      toast.error('Invalid Login Credentials.', {
        position: 'top-center',
        autoClose: 2000,
      });
      reject({ success: false});
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
  profileimg/*,
  doctor*/
) => async (dispatch) => {
  return new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth();
      const db = getFirestore();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDocRef = doc(db, 'users', user.uid);
      /*if (role == 'patient') {
        await setDoc(userDocRef, {
          // If the user's role is 'patient', add a doctor reference
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          profileimg: profileimg,
          doctor: doctor,
        });
      }*/

      //else {
        await setDoc(userDocRef, {
          firstname: firstname,
          lastname: lastname,
          email: email,
          role: role,
          profileimg: profileimg
        });
      //}

      toast.success('Registration successful. You can now login through the login area (If you are A doctor)', {
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
