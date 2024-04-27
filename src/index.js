import { getPatientData } from "./firebase";
import { renderPatientInfo, renderTimestampHistory } from "./ui";
import initInteraction from "./interaction";
import "./output.css"

const patientId = "<patient_id>";

getPatientData(patientId).then((data) => {
  console.log(data);

  const patientData = data;
  const timestampHistory = data.data;
  renderPatientInfo(patientData);
  renderTimestampHistory(timestampHistory);
  initInteraction(patientId);
});

