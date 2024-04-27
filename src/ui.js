/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const renderPatientInfo = (patientData) => {
  const container = document.getElementById("patient-info");
  container.innerHTML = `
    <h2 class="text-3xl font-bold">${patientData.demographics.name || "N/A"}</h2>
    <p class="text-xl">Age: ${patientData.demographics.age || "N/A"}</p>
    <p class="text-xl">Gender: ${patientData.demographics.gender || "N/A"}</p>
    `;
};

const renderTimestampHistory = (timestampData) => {
  const container = document.getElementById("timestamp-history");
  container.innerHTML = '<h1 class="text-3xl font-bold">Timestamp History<h1>';
  for (const timestampId in timestampData) {
    const timestamp = timestampData[timestampId]; // Access data using key

    const timestampElement = document.createElement("div");
    timestampElement.className = "timestamp";
    timestampElement.innerHTML = `
      <p>Time: ${new Date(timestampId).toLocaleString()}</p>
      <p>Heart Rate: ${timestamp.heartRate} BPM</p>
      <p>Temperature: ${timestamp.temperature}°C</p>
      <p>Ward: <input type="text" value="${
        timestamp.ward || ""
      }" data-timestamp-id="${timestampId}"></p>
      <p>Alert: ${timestamp.alert ? "Yes" : "No"}</p>
      <textarea data-timestamp-id="${timestampId}" placeholder="Notes">${
        timestamp.notes || ""
      }</textarea>
      <button data-timestamp-id="${timestampId}">Save</button>
    `;
    container.appendChild(timestampElement);
  }
};

const renderPatientData = (data) => {
  renderPatientInfo(data);
  renderTimestampHistory(data.data);
};

export { renderPatientInfo, renderTimestampHistory, renderPatientData };
