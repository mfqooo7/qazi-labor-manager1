let language = "en";

function toggleLanguage() {
  language = language === "en" ? "ur" : "en";
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = el.dataset[language];
  });
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
}

function registerWorker() {
  const name = document.getElementById("workerName").value;
  const type = document.getElementById("workerType").value.toLowerCase();
  const rate = parseFloat(document.getElementById("workerRate").value);
  if (!name || !rate || !["daily", "monthly"].includes(type)) return alert("Fill valid data");
  
  const workers = getData("workers");
  workers.push({ name, type, rate });
  saveData("workers", workers);
  displayWorkers();
}

function displayWorkers() {
  const list = document.getElementById("workerList");
  list.innerHTML = "";
  getData("workers").forEach((w, i) => {
    const li = document.createElement("li");
    li.textContent = `${w.name} (${w.type}, ${w.rate})`;
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteWorker(i);
    li.appendChild(delBtn);
    list.appendChild(li);
  });
}

function deleteWorker(index) {
  if (!confirm("Are you sure?")) return;
  const workers = getData("workers");
  workers.splice(index, 1);
  saveData("workers", workers);
  displayWorkers();
}

function markAttendance() {
  const name = document.getElementById("attWorkerName").value;
  const date = document.getElementById("attDate").value;
  if (!name || !date) return alert("Fill both fields");
  const attendance = getData("attendance");
  attendance.push({ name, date });
  saveData("attendance", attendance);
}

function recordAdvance() {
  const name = document.getElementById("advWorkerName").value;
  const amount = parseFloat(document.getElementById("advAmount").value);
  if (!name || !amount) return alert("Fill both fields");
  const advances = getData("advances");
  advances.push({ name, amount });
  saveData("advances", advances);
}

function calculateSalary() {
  const name = document.getElementById("salaryWorkerName").value;
  const workers = getData("workers");
  const worker = workers.find(w => w.name === name);
  if (!worker) return alert("Worker not found");

  const att = getData("attendance").filter(a => a.name === name).length;
  const adv = getData("advances").filter(a => a.name === name).reduce((sum, a) => sum + a.amount, 0);
  const salary = worker.type === "daily" ? worker.rate * att : worker.rate;
  const final = salary - adv;

  document.getElementById("salaryOutput").textContent =
    `Base: ${salary}, Advance: ${adv}, Final: ${final}`;
}

window.onload = displayWorkers;
