import * as types from "../actionTypes/userActionTypes";
import fire from "../../firebase";

const fetchUsers = (users) => ({
  type: types.FETCH_USERS,
  payload: users,
});


export const getUsers = () => async (dispatch) => {
  try {
    fire
      .firestore()
      .collection("users")
      .get()
      .then((users) => {
        const usersData = [];
        users.forEach((user) => {
          const userData = user.data();
          const userId = user.id;
          const userWithId = { ...userData, docId: userId };
          usersData.push(userWithId);
        });
        dispatch(fetchUsers(usersData));
      })

  } catch (error) {
    console.error("Error fetching users: ", error);
  }
};

