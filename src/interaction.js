import { updateTimestamp } from "./firebase";

const handleSaveTimestamp = (e, patientId) => {
  const { timestampId } = e.target.dataset;
  const ward = e.target.parentElement.querySelector('input[type="text"]').value;
  const notes = e.target.parentElement.querySelector("textarea").value;
  updateTimestamp(patientId, timestampId, { ward, notes });
};

const initInteraction = function attachTimestampSavingEventListeners(patientId) {
  document.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON" && e.target.dataset.timestampId) {
      handleSaveTimestamp(e, patientId);
    }
  });
};

export default initInteraction;
