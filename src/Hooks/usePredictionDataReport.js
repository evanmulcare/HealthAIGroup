import * as XLSX from 'xlsx';

const downloadDataset = (url, filename) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error('Failed to download the dataset');
      }
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const downloadAccuracyReport = (url, filename) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        throw new Error('Failed to download the report');
      }
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

export const addRow = ({ reports, type, setData, data }) => {
  let newData = [...data]; // Create a copy of existing data

  // Iterate over reports and add a new row for each
  reports.forEach((report) => {
    let newRow;

    if (type === "heart") {
      newRow = {
        "Age": report.age,
        "Sex": report.sex,
        "Chest pain type": report.ChestPainType,
        "BP": report.BP,
        "Cholesterol": report.Cholesterol,
        "FBS over 120": report.FBSOver120,
        "EKG results": report.EKGResults,
        "Max HR": report.MaxHR,
        "Exercise angina": report.ExerciseAngina,
        "ST depression": report.STdepression,
        "Slope of ST": report.SlopeOfST,
        "Number of vessels fluro": report.NumberOfVesselsFluro,
        "Thallium": report.Thallium,
        "Heart Disease": report.result,
      };
    } else if (type === "diabetes") {
      
      newRow = {
        "Pregnancies": report.Pregnancies,
        "Glucose": report.Glucose,
        "BloodPressure": report.BloodPressure,
        "SkinThickness": report.SkinThickness,
        "Insulin": report.Insulin,
        "BMI": report.BMI,
        "DiabetesPedigreeFunction": report.DiabetesPedigreeFunction,
        "Age": report.Age,
        "Outcome": report.result,
       
      };
    } else if (type === "lung") {
      
      newRow = {
        "GENDER": report.GENDER,
        "AGE": report.AGE,
        "SMOKING": report.SMOKING,
        "YELLOW_FINGERS": report.YELLOW_FINGERS,
        "ANXIETY": report.ANXIETY,
        "PEER_PRESSURE": report.PEER_PRESSURE,
        "CHRONIC DISEASE": report.CHRONIC_DISEASE,
        "FATIGUE": report.FATIGUE,
        "ALLERGY": report.ALLERGY,
        "WHEEZING": report.WHEEZING,
        "ALCOHOL CONSUMING": report.ALCOHOL_CONSUMING,
        "COUGHING": report.COUGHING,
        "SHORTNESS OF BREATH": report.SHORTNESS_OF_BREATH,
        "SWALLOWING DIFFICULTY": report.SWALLOWING_DIFFICULTY,
        "CHEST PAIN": report.CHEST_PAIN,
        "LUNG_CANCER": report.result,

      };
    }

    newData = [...newData, newRow]; // Add the new row to newData
  });

  // Set the updated data
  setData(newData);

  // Convert the updated data to CSV format
  const ws = XLSX.utils.json_to_sheet(newData);
  const csv = XLSX.utils.sheet_to_csv(ws);

  // Create a Blob from the CSV data
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });

  // Trigger a file download for the new CSV file
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = `updated_data_${type}.csv`; // Use type in the filename
  link.click();
};


export const downloadHeartDiseaseAccuracy = () => {
  downloadAccuracyReport("http://127.0.0.1:5000/download-heart-data-accuracy-txt", 'HeartDiseaseAccuracy.txt');
};

export const downloadLungCancerAccuracy = () => {
  downloadAccuracyReport("http://127.0.0.1:5000/download-lung-data-accuracy-txt", 'LungCancerAccuracy.txt');
};

export const downloadDiabetesAccuracy = () => {
  downloadAccuracyReport("http://127.0.0.1:5000/download-diabetes-data-accuracy-txt", 'DiabetesAccuracy.txt');
};


export const downloadHeartDiseaseReport = () => {
  downloadDataset("http://127.0.0.1:5000/download-heart-data-csv", 'HeartDiseaseDataset.csv');
};

export const downloadLungCancerReport = () => {
  downloadDataset("http://127.0.0.1:5000/download-lung-data-csv", 'LungCancerDataset.csv');
};


export const downloadDiabetesReport = () => {
  downloadDataset("http://127.0.0.1:5000/download-diabetes-data-csv", 'DiabetesDataset.csv');
};