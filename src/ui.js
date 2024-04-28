/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import { Chart } from "chart.js/auto";

const renderPatientInfo = (patientData) => {
  const container = document.getElementById("patient-info");
  container.innerHTML = `
    <h2 class="text-3xl font-bold">${
      patientData.demographics.name || "N/A"
    }</h2>
    <p class="text-xl">Age: ${patientData.demographics.age || "N/A"}</p>
    <p class="text-xl">Gender: ${patientData.demographics.gender || "N/A"}</p>
    `;
};

let myChart;

const renderGraph = (timestampData) => {
  const heartRates = [];
  const temperatures = [];
  const times = [];

  for (const timestampId in timestampData) {
    heartRates.push(timestampData[timestampId].heartRate);
    temperatures.push(timestampData[timestampId].temperature);
    times.push(new Date(timestampId).toLocaleString());
  }

  const ctx = document.getElementById("graphs").getContext("2d");

  // If a chart already exists, destroy it and nullify the variable
  if (myChart) {
    myChart.destroy();
    myChart = null;
  }

  // Create a new Chart instance
  myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: times,
      datasets: [
        {
          label: "Heart Rate (BPM)",
          data: heartRates,
          borderColor: "rgb(185, 28, 28)",
          backgroundColor: "rgba(185, 28, 28, 0.5)",
          fill: false,
        },
        {
          label: "Temperature (°C)",
          data: temperatures,
          borderColor: "rgb(234, 88, 12)",
          backgroundColor: "rgba(234, 88, 12, 0.5)",
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Time",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Value",
          },
        },
      },
    },
  });
};

const renderTimestampHistory = (timestampData) => {
  // Declare SVG icons
  const heartSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#b91c1c"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>';
  const tempSvg =
    '<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#ea580c"><g><path d="M0,0h24v24H0V0z" fill="none"/></g><g><path d="M15,13V5c0-1.66-1.34-3-3-3S9,3.34,9,5v8c-1.21,0.91-2,2.37-2,4c0,2.76,2.24,5,5,5s5-2.24,5-5C17,15.37,16.21,13.91,15,13z M11,11V5c0-0.55,0.45-1,1-1s1,0.45,1,1v1h-1v1h1v1v1h-1v1h1v1H11z"/></g></svg>';

  const container = document.getElementById("timestamp-history");
  container.innerHTML = '<h1 class="text-3xl font-bold">Timestamp History<h1>';
  for (const timestampId in timestampData) {
    const timestamp = timestampData[timestampId]; // Access data using key

    const bgColor = timestamp.alert ? "bg-red-500" : "bg-sky-200";

    const timestampElement = document.createElement("div");
    timestampElement.className = `timestamp rounded-xl shadow-lg p-4 space-y-2 ${bgColor}`;
    timestampElement.innerHTML = `
      <p class="text-xl font-semibold">${new Date(
        timestampId
      ).toLocaleString()}</p>
      <p class="flex">${heartSvg} ${timestamp.heartRate} BPM</p>
      <p class="flex">${tempSvg} ${timestamp.temperature}°C</p>
      <p><input type="text" value="${
        timestamp.ward || ""
      }" data-timestamp-id="${timestampId}" class="${bgColor}"></p>
      <textarea data-timestamp-id="${timestampId}" class="w-full ${bgColor}" placeholder="Notes">${
        timestamp.notes || ""
      }</textarea>
      <button data-timestamp-id="${timestampId}" class="m-auto hover:text-white font-bold flex justify-center">Save</button>
    `;
    container.appendChild(timestampElement);
  }
  renderGraph(timestampData);
};

const renderPatientData = (data) => {
  renderPatientInfo(data);
  renderTimestampHistory(data.data);
};

export { renderPatientInfo, renderTimestampHistory, renderPatientData };
