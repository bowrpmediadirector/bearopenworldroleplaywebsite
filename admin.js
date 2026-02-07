const AUTH_KEY = 'bear-rp-admin-auth';
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'bearrp123';

let siteData = getSiteData();

function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

function setLoggedIn(value) {
  localStorage.setItem(AUTH_KEY, String(value));
}

function showPanel(loggedIn) {
  document.getElementById('login-section').classList.toggle('hidden', loggedIn);
  document.getElementById('panel-section').classList.toggle('hidden', !loggedIn);
}

function renderManageList(containerId, items, textFn, removeFn) {
  const container = document.getElementById(containerId);
  container.innerHTML = '';

  items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'manage-row';

    const text = document.createElement('p');
    text.className = 'hint';
    text.textContent = textFn(item);

    const removeButton = document.createElement('button');
    removeButton.className = 'btn danger';
    removeButton.type = 'button';
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeFn(index));

    row.appendChild(text);
    row.appendChild(removeButton);
    container.appendChild(row);
  });
}

function saveAndRender() {
  saveSiteData(siteData);
  renderAllPreview();
}

function renderAllPreview() {
  renderManageList(
    'announcement-preview',
    siteData.announcements,
    (item) => `• ${item.title}`,
    (index) => {
      siteData.announcements.splice(index, 1);
      saveAndRender();
    }
  );

  renderManageList(
    'staff-preview',
    siteData.staff,
    (item) => `• ${item.name} — ${item.role}`,
    (index) => {
      siteData.staff.splice(index, 1);
      saveAndRender();
    }
  );

  renderManageList(
    'event-preview',
    siteData.events,
    (item) => `• ${item.name} (${item.date})`,
    (index) => {
      siteData.events.splice(index, 1);
      saveAndRender();
    }
  );
}

function setupLogin() {
  const form = document.getElementById('login-form');
  const feedback = document.getElementById('login-feedback');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setLoggedIn(true);
      showPanel(true);
      renderAllPreview();
      feedback.textContent = '';
      form.reset();
      return;
    }

    feedback.textContent = 'Invalid login. Try again.';
  });
}

function setupLogout() {
  document.getElementById('logout-btn').addEventListener('click', () => {
    setLoggedIn(false);
    showPanel(false);
  });
}

function setupForms() {
  document.getElementById('announcement-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('announcement-title').value.trim();
    const body = document.getElementById('announcement-body').value.trim();
    siteData.announcements.unshift({ title, body });
    saveAndRender();
    event.target.reset();
  });

  document.getElementById('staff-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('staff-name').value.trim();
    const role = document.getElementById('staff-role').value.trim();
    siteData.staff.unshift({ name, role });
    saveAndRender();
    event.target.reset();
  });

  document.getElementById('event-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('event-name').value.trim();
    const date = document.getElementById('event-date').value;
    siteData.events.unshift({ name, date });
    saveAndRender();
    event.target.reset();
  });
}

function init() {
  document.getElementById('year').textContent = new Date().getFullYear();
  const loggedIn = isLoggedIn();
  showPanel(loggedIn);
  setupLogin();
  setupLogout();
  setupForms();
  if (loggedIn) renderAllPreview();
}

init();
