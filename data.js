const STORAGE_KEY = 'bear-rp-data';

const defaultData = {
  departments: [
    { name: 'Law Enforcement', description: 'Traffic enforcement, investigations, and tactical response.' },
    { name: 'Fire & Rescue', description: 'Fire suppression, technical rescues, and safety inspections.' },
    { name: 'EMS', description: 'Medical emergencies, patient transport, and trauma care.' },
    { name: 'Civilian Operations', description: 'Business owners, logistics, legal services, and more.' },
  ],
  staff: [
    { name: 'Chief Grizzly', role: 'Community Director' },
    { name: 'Captain Maple', role: 'Operations Lead' },
    { name: 'Lieutenant Pine', role: 'Training Supervisor' },
    { name: 'Sergeant River', role: 'Staff Coordinator' },
  ],
  announcements: [
    { title: 'Server Launch Weekend', body: 'Double XP is active for all whitelisted players through Sunday.' },
    { title: 'New CAD Update', body: 'Vehicle MDT and dispatch templates have been refreshed for all units.' },
  ],
  events: [
    { name: 'Ride-Along Night', date: '2026-03-06' },
    { name: 'Mass Casualty Drill', date: '2026-03-12' },
    { name: 'City Hall Townhall', date: '2026-03-21' },
  ],
};

function getSiteData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }

  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
    return structuredClone(defaultData);
  }
}

function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
