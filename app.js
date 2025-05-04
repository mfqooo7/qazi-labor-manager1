const langToggle = document.getElementById("lang-toggle");
const labels = {
  en: {
    title: "Qazi Labor Manager",
    register: "Register Worker",
    name: "Name",
    type: "Type",
    daily: "Daily",
    monthly: "Monthly",
    registerBtn: "Register",
    attendance: "Mark Attendance",
    advance: "Record Advance",
    summary: "Monthly Summary",
    delete: "Delete",
    attendanceBtn: "Present",
    advanceBtn: "Give Advance"
  },
  ur: {
    title: "قاضی لیبر مینیجر",
    register: "ورکر رجسٹر کریں",
    name: "نام",
    type: "قسم",
    daily: "یومیہ",
    monthly: "ماہانہ",
    registerBtn: "رجسٹر کریں",
    attendance: "حاضری لگائیں",
    advance: "ایڈوانس درج کریں",
    summary: "ماہانہ خلاصہ",
    delete: "حذف کریں",
    attendanceBtn: "حاضر",
    advanceBtn: "ایڈوانس دیں"
  }
};

let currentLang = "en";
let workers = JSON.parse(localStorage.getItem("workers") || "[]");

function saveWorkers() {
  localStorage.setItem("workers", JSON.stringify(workers));
}

function renderWorkers() {
  const list = document.getElementById("worker-list");
  list.innerHTML = "";
  workers.forEach((worker, index) => {
    const div = document.createElement("div");
    div.className = "worker-entry";
    div.innerHTML = `
      <strong>${worker.name}</strong> (${worker.type}) - 
      Attendance: ${worker.attendance} | Advance: ₹${worker.advance}
      <button onclick="markAttendance(${index})">${labels[currentLang].attendanceBtn}</button>
      <button onclick="giveAdvance(${index})">${labels[currentLang].advanceBtn}</button>
      <button onclick="deleteWorker(${index})">${labels[currentLang].delete}</button>
    `;
    list.appendChild(div);
  });
  updateSummary();
}

function updateSummary() {
  const summary = document.getElementById("salary-summary");
  let dailyTotal = 0, monthlyTotal = 0;
  workers.forEach(w => {
    if (w.type === "Daily") {
      dailyTotal += w.attendance * 500 - w.advance;
    } else {
      monthlyTotal += 15000 - w.advance;
    }
  });
  summary.innerHTML = `
    <p><strong>Daily Workers Net Salary:</strong> ₹${dailyTotal}</p>
    <p><strong>Monthly Workers Net Salary:</strong> ₹${monthlyTotal}</p>
  `;
}

function addWorker(e) {
  e.preventDefault();
  const name = document.getElementById("worker-name").value.trim();
  const type = document.getElementById("worker-type").value;
  if (!name) return alert("Enter name");
  workers.push({ name, type, attendance: 0, advance: 0 });
  saveWorkers();
  renderWorkers();
  e.target.reset();
}

function markAttendance(index) {
  workers[index].attendance += 1;
  saveWorkers();
  renderWorkers();
}

function giveAdvance(index) {
  const amt = prompt("Advance amount?");
  const val = parseInt(amt);
  if (!isNaN(val)) {
    workers[index].advance += val;
    saveWorkers();
    renderWorkers();
  }
}

function deleteWorker(index) {
  if (confirm("Are you sure you want to delete this worker?")) {
    workers.splice(index, 1);
    saveWorkers();
    renderWorkers();
  }
}

function switchLanguage() {
  currentLang = currentLang === "en" ? "ur" : "en";
  updateText();
  renderWorkers();
}

function updateText() {
  const l = labels[currentLang];
  document.getElementById("app-title").textContent = l.title;
  document.getElementById("form-title").textContent = l.register;
  document.getElementById("name-label").textContent = l.name;
  document.getElementById("type-label").textContent = l.type;
  document.getElementById("daily-option").textContent = l.daily;
  document.getElementById("monthly-option").textContent = l.monthly;
  document.getElementById("register-button").textContent = l.registerBtn;
  document.getElementById("attendance-title").textContent = l.attendance;
  document.getElementById("advance-title").textContent = l.advance;
  document.getElementById("summary-title").textContent = l.summary;
  langToggle.textContent = currentLang === "en" ? "اردو" : "English";
}

document.getElementById("register-form").addEventListener("submit", addWorker);
langToggle.addEventListener("click", switchLanguage);

updateText();
renderWorkers();
