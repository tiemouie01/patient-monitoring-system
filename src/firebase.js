import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";
import { renderPatientData } from "./ui";

const firebaseConfig = {
  apiKey: "AIzaSyBLYYbHcEz1s22WrjtokUFgr0f42kqyGPo",
  authDomain: "hdashboard-a1b5c.firebaseapp.com",
  databaseURL: "https://hdashboard-a1b5c-default-rtdb.firebaseio.com",
  projectId: "hdashboard-a1b5c",
  storageBucket: "hdashboard-a1b5c.appspot.com",
  messagingSenderId: "480541103871",
  appId: "1:480541103871:web:2a7682095e996ef009deca",
};

initializeApp(firebaseConfig);

const database = getDatabase();

const getPatientData = function getPatientDataFromDatabase(patientId) {
  const patientDataRef = ref(database, `patients/${patientId}`);
  
  // Additionally, listen for data changes and update UI
  onValue(patientDataRef, (snapshot) => {
    const data = snapshot.val();
    renderPatientData(data); // Call a function to update UI
  });

  return new Promise((resolve) => {
    onValue(patientDataRef, (snapshot) => {
      resolve(snapshot.val());
    });
  });

};

const updateTimestamp = function updateTimestampWithDataObject(
  patientId,
  timestampId,
  data
) {
  return set(ref(database, `patients/${patientId}/data/${timestampId}`), data);
};

export { getPatientData, updateTimestamp };
