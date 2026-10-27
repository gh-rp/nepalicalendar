export interface BSDate {
  year: number;
  month: number; // 1-12 (1 = Baishakh, 12 = Chaitra)
  day: number; // 1-32
}

export interface ADDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

export interface TithiInfo {
  tithiIndex: number; // 1-15
  tithiName: string; // e.g., "एकादशी", "पूर्णिमा", "औंसी", "प्रतिपदा"
  paksha: 'शुक्ल' | 'कृष्ण';
  moonPhase: 'new' | 'waxing_crescent' | 'first_quarter' | 'waxing_gibbous' | 'full' | 'waning_gibbous' | 'last_quarter' | 'waning_crescent';
  moonIllumination: number; // 0 to 1
}

export interface CalendarEvent {
  id: string;
  title: string;
  titleEn?: string;
  nepaliDateStr: string; // "2083-07-10"
  isHoliday: boolean;
  isOfficialGovHoliday: boolean;
  category: 'festival' | 'holiday' | 'tithi' | 'personal';
  description?: string;
  color?: string;
}

export interface PersonalEvent {
  id: string;
  title: string;
  bsYear: number;
  bsMonth: number;
  bsDay: number;
  color: string;
  notes?: string;
  createdAt: string;
}

export interface PanchangaInfo {
  tithi: string;
  paksha: string;
  chandrama: string;
}

export interface DayDetailData {
  bsDate: BSDate;
  adDate: Date;
  dayOfWeek: number;
  dayNameNe: string;
  dayNameEn: string;
  tithi: TithiInfo;
  isSaturday: boolean;
  isHoliday: boolean;
  holidays: CalendarEvent[];
  personalEvents: PersonalEvent[];
  panchanga: PanchangaInfo;
}
