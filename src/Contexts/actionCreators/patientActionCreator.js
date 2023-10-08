import * as types from "../actionTypes/patientActionTypes";
import fire from "../../firebase";

const fetchPatients = (patients) => ({
  type: types.FETCH_PATIENTS,
  payload: patients,
});

const setLoading = (isLoading) => ({
  type: types.SET_LOADING,
  payload: isLoading,
});

export const getPatients = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    fire
      .firestore()
      .collection("patients")
      .get()
      .then((patients) => {
        const patientsData = [];
        patients.forEach((patient) => {
          const patientData = patient.data();
          const patientId = patient.id;
          const patientWithId = { ...patientData, docId: patientId };
          patientsData.push(patientWithId);
        });
        dispatch(fetchPatients(patientsData));
        dispatch(setLoading(false));
      })

  } catch (error) {
    console.error("Error fetching patients: ", error);
    dispatch(setLoading(false));
  }
};

