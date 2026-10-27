import { PersonalEvent, BSDate } from '../types';
import { bsToAd, calculateDaysRemaining, formatRemainingDays } from './nepaliCalendar';

const STORAGE_KEY = 'nepali_calendar_personal_events_v2';

export const INITIAL_SAMPLE_EVENTS: PersonalEvent[] = [
  {
    id: 'sample-1',
    title: 'आमाको जन्मदिन (Aama’s Birthday)',
    bsYear: 2083,
    bsMonth: 7,
    bsDay: 15,
    color: '#e11d48', // vibrant rose
    notes: 'मिठाई र उपहार किन्ने, शुभकामना दिने',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-2',
    title: 'वार्षिक परियोजना समीक्षा (Project Review)',
    bsYear: 2083,
    bsMonth: 7,
    bsDay: 20,
    color: '#2563eb', // royal blue
    notes: 'प्रस्तुतीकरण स्लाइड र प्रतिवेदन तयार गर्ने',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'sample-3',
    title: 'विवाह वार्षिकोत्सव (Wedding Anniversary)',
    bsYear: 2083,
    bsMonth: 7,
    bsDay: 28,
    color: '#d97706', // amber gold
    notes: 'पारिवारिक रात्रीभोज योजना',
    createdAt: new Date().toISOString(),
  },
];

export function getStoredPersonalEvents(): PersonalEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_EVENTS));
      return INITIAL_SAMPLE_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to load personal events:', e);
    return INITIAL_SAMPLE_EVENTS;
  }
}

export function savePersonalEvents(events: PersonalEvent[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  } catch (e) {
    console.error('Failed to save personal events:', e);
  }
}

export function addPersonalEvent(event: Omit<PersonalEvent, 'id' | 'createdAt'>): PersonalEvent {
  const all = getStoredPersonalEvents();
  const newEvent: PersonalEvent = {
    ...event,
    id: 'event_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    createdAt: new Date().toISOString(),
  };
  const updated = [newEvent, ...all];
  savePersonalEvents(updated);
  return newEvent;
}

export function deletePersonalEvent(id: string): PersonalEvent[] {
  const all = getStoredPersonalEvents();
  const updated = all.filter((e) => e.id !== id);
  savePersonalEvents(updated);
  return updated;
}

export function updatePersonalEvent(id: string, updates: Partial<PersonalEvent>): PersonalEvent[] {
  const all = getStoredPersonalEvents();
  const updated = all.map((e) => (e.id === id ? { ...e, ...updates } : e));
  savePersonalEvents(updated);
  return updated;
}

export function getEventsForBsDate(date: BSDate, allEvents: PersonalEvent[]): PersonalEvent[] {
  return allEvents.filter(
    (e) => e.bsYear === date.year && e.bsMonth === date.month && e.bsDay === date.day
  );
}

export interface UpcomingItem {
  id: string;
  title: string;
  bsYear: number;
  bsMonth: number;
  bsDay: number;
  adDate: Date;
  daysRemaining: number;
  countdownTextNe: string;
  countdownTextEn: string;
  status: 'today' | 'upcoming' | 'passed';
  color: string;
  notes?: string;
}

export function getUpcomingPersonalEvents(
  personalEvents: PersonalEvent[],
  todayAd: Date = new Date()
): UpcomingItem[] {
  const items: UpcomingItem[] = [];

  for (const pe of personalEvents) {
    const adDate = bsToAd(pe.bsYear, pe.bsMonth, pe.bsDay);
    const daysRemaining = calculateDaysRemaining(adDate, todayAd);
    const { textNe, textEn, status } = formatRemainingDays(daysRemaining);

    items.push({
      id: pe.id,
      title: pe.title,
      bsYear: pe.bsYear,
      bsMonth: pe.bsMonth,
      bsDay: pe.bsDay,
      adDate,
      daysRemaining,
      countdownTextNe: textNe,
      countdownTextEn: textEn,
      status,
      color: pe.color,
      notes: pe.notes,
    });
  }

  // Sort: upcoming (>= 0) first sorted by lowest daysRemaining, then passed
  return items.sort((a, b) => {
    if (a.daysRemaining >= 0 && b.daysRemaining < 0) return -1;
    if (a.daysRemaining < 0 && b.daysRemaining >= 0) return 1;
    return a.daysRemaining - b.daysRemaining;
  });
}
