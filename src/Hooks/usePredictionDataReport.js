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
  
 export const downloadHeartDiseaseAccuracy = () => {
    downloadAccuracyReport("http://127.0.0.1:5000/download-heart-data-accuracy-txt", 'HeartDiseaseAccuracy.txt');
  };
  
  export const downloadLungCancerAccuracy = () => {
    downloadAccuracyReport("http://127.0.0.1:5000/download-lung-data-accuracy-txt", 'LungCancerAccuracy.txt');
  };

  export const downloadHeartDiseaseReport = () => {
        downloadDataset("http://127.0.0.1:5000/download-heart-data-csv", 'HeartDiseaseDataset.csv');
        };
        
  export const downloadLungCancerReport = () => {
        downloadDataset("http://127.0.0.1:5000/download-lung-data-csv", 'LungCancerDataset.csv');
        };