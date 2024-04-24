import { getPatientData, updateTimestamp } from "./firebase";
import { renderPatientInfo, renderTimestampHistory } from "./ui";

getPatientData("<patient_id>").then((data) => {
  console.log(data);

  const patientData = data;
  const timestampHistory = data.data;
  renderPatientInfo(patientData);
  renderTimestampHistory(timestampHistory);
});