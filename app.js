const workers = [];

function updateWorkerDropdowns() {
  const dropdowns = [
    document.getElementById('attendanceWorker'),
    document.getElementById('advanceWorker'),
    document.getElementById('salaryWorker')
  ];

  dropdowns.forEach(dropdown => {
    dropdown.innerHTML = '';
    workers.forEach((worker, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = worker.name;
      dropdown.appendChild(option);
    });
  });
}

function registerWorker() {
  const name = document.getElementById('workerName').value;
  const dailyWage = parseFloat(document.getElementById('dailyWage').value);

  if (!name || isNaN(dailyWage)) {
    alert('Please enter valid worker details.');
    return;
  }

  workers.push({
    name,
    dailyWage,
    attendance: 0,
    advance: 0
  });

  updateWorkerDropdowns();
  displayWorkers();
  document.getElementById('workerName').value = '';
  document.getElementById('dailyWage').value = '';
}

function markAttendance() {
  const index = document.getElementById('attendanceWorker').value;
  workers[index].attendance += 1;
  displayWorkers();
}

function giveAdvance() {
  const index = document.getElementById('advanceWorker').value;
  const amount = parseFloat(document.getElementById('advanceAmount').value);

  if (isNaN(amount)) {
    alert('Please enter a valid amount.');
    return;
  }

  workers[index].advance += amount;
  document.getElementById('advanceAmount').value = '';
  displayWorkers();
}

function calculateSalary() {
  const index = document.getElementById('salaryWorker').value;
  const worker = workers[index];
  const salary = (worker.attendance * worker.dailyWage) - worker.advance;

  document.getElementById('salaryResult').innerText = 
    `${worker.name}'s salary is ₹${salary}`;
}

function displayWorkers() {
  const list = document.getElementById('workersList');
  list.innerHTML = '';

  workers.forEach(worker => {
    const item = document.createElement('li');
    item.textContent = `${worker.name} - ₹${worker.dailyWage}/day | Present: ${worker.attendance} | Advance: ₹${worker.advance}`;
    list.appendChild(item);
  });
}

updateWorkerDropdowns();
