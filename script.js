let language = 'en';

const translations = {
  en: {
    appTitle: "Qazi Agri Farms - Labor Manager",
    dailyTitle: "Daily Workers",
    monthlyTitle: "Monthly Workers",
    namePlaceholder: "Worker Name",
    wagePlaceholder: "Monthly Wage",
    addButton: "Add Worker"
  },
  ur: {
    appTitle: "قاضی ایگری فارمز - لیبر مینیجر",
    dailyTitle: "روزانہ اجرت والے مزدور",
    monthlyTitle: "ماہانہ اجرت والے مزدور",
    namePlaceholder: "مزدور کا نام",
    wagePlaceholder: "ماہانہ تنخواہ",
    addButton: "مزدور شامل کریں"
  }
};

function toggleLanguage() {
  language = language === 'en' ? 'ur' : 'en';
  updateText();
}

function updateText() {
  const t = translations[language];
  document.getElementById('appTitle').textContent = t.appTitle;
  document.getElementById('dailyTitle').textContent = t.dailyTitle;
  document.getElementById('monthlyTitle').textContent = t.monthlyTitle;
  document.getElementById('dailyName').placeholder = t.namePlaceholder;
  document.getElementById('monthlyName').placeholder = t.namePlaceholder;
  document.getElementById('monthlyWage').placeholder = t.wagePlaceholder;
}

function showTab(tab) {
  document.getElementById('dailyTab').classList.add('hidden');
  document.getElementById('monthlyTab').classList.add('hidden');
  document.getElementById(tab + 'Tab').classList.remove('hidden');
}

function addWorker(type) {
  const name = document.getElementById(`${type}Name`).value;
  let wage = 500; // default wage for daily
  if (type === 'monthly') {
    wage = document.getElementById('monthlyWage').value || wage;
  }

  const worker = {
    name,
    wage,
    type
  };

  const workers = JSON.parse(localStorage.getItem(type + 'Workers')) || [];
  workers.push(worker);
  localStorage.setItem(type + 'Workers', JSON.stringify(workers));
  displayWorkers(type);
}

function displayWorkers(type) {
  const list = document.getElementById(type + 'List');
  list.innerHTML = '';
  const workers = JSON.parse(localStorage.getItem(type + 'Workers')) || [];
  workers.forEach((w, i) => {
    const item = document.createElement('li');
    item.textContent = `${w.name} - Rs. ${w.wage}`;
    list.appendChild(item);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  updateText();
  displayWorkers('daily');
  displayWorkers('monthly');
});
