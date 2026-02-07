function createCard({ name, description, role }) {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `<h4>${name}</h4><p>${description || role}</p>`;
  return card;
}

function renderDepartments(siteData) {
  const list = document.getElementById('department-list');
  if (!list) return;
  siteData.departments.forEach((item) => list.appendChild(createCard(item)));
}

function renderStaff(siteData) {
  const list = document.getElementById('staff-list');
  if (!list) return;
  siteData.staff.forEach((item) => list.appendChild(createCard(item)));
}

function renderAnnouncements(siteData) {
  const container = document.getElementById('announcement-list');
  if (!container) return;
  container.innerHTML = '';
  siteData.announcements.forEach(({ title, body }) => {
    const item = document.createElement('article');
    item.className = 'list-item';
    item.innerHTML = `<h4>${title}</h4><p>${body}</p>`;
    container.appendChild(item);
  });
}

function renderEvents(siteData) {
  const container = document.getElementById('event-list');
  if (!container) return;
  container.innerHTML = '';
  siteData.events.forEach(({ name, date }) => {
    const item = document.createElement('article');
    item.className = 'list-item';
    item.innerHTML = `<h4>${name}</h4><p>${new Date(`${date}T00:00:00`).toDateString()}</p>`;
    container.appendChild(item);
  });
}

function renderCalendar(siteData) {
  const calendar = document.getElementById('calendar-grid');
  if (!calendar) return;
  calendar.innerHTML = '';
  const eventDays = new Set(siteData.events.map((event) => Number(event.date.split('-')[2])));

  for (let day = 1; day <= 31; day += 1) {
    const cell = document.createElement('div');
    cell.className = `day ${eventDays.has(day) ? 'event' : ''}`;
    cell.textContent = day;
    calendar.appendChild(cell);
  }
}

function init() {
  const siteData = getSiteData();
  renderDepartments(siteData);
  renderStaff(siteData);
  renderAnnouncements(siteData);
  renderEvents(siteData);
  renderCalendar(siteData);

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
}

init();
