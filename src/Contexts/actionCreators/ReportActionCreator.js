import * as types from "../actionTypes/ReportActionTypes";
import fire from "../../firebase";
import { toast } from 'react-toastify';

const fetchReports = (reports) => ({
    type: types.FETCH_REPORTS,
    payload: reports,
});

const addReport = (report) => ({
    type: types.CREATE_REPORT,
    payload: report,
});

export const getReports = () => async (dispatch) => { 
    try {
        fire
            .firestore()
            .collection("reports") 
            .get()
            .then((reports) => { 
                const reportsData = [];
                reports.forEach((report) => { 
                    const reportData = report.data(); 
                    const reportId = report.id; 
                    const reportWithId = { ...reportData, docId: reportId };
                    reportsData.push(reportWithId);
                });
                dispatch(fetchReports(reportsData)); 
            })
    } catch (error) {
        console.error("Error fetching reports: ", error); 
    }
};

export const createReportAsync = (newReportData) => async (dispatch) => {
    try {
        const docRef = await fire.firestore().collection("reports").add(newReportData);
        const reportId = docRef.id; 
        const reportData = { ...newReportData, docId: reportId };
        dispatch(addReport(reportData));
    } catch (error) {
        console.error("Error creating report: ", error);
        toast.error("Error creating report");
    }
};
