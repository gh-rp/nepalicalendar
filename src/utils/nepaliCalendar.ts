import { BSDate, ADDate, TithiInfo, PanchangaInfo } from '../types';
import { OFFICIAL_2083_TITHIS } from '../data/official2083Data';

// Nepali Months Information
export const NEPALI_MONTHS = [
  { id: 1, nameNe: 'बैशाख', nameEn: 'Baishakh', season: 'वसन्त' },
  { id: 2, nameNe: 'जेठ', nameEn: 'Jestha', season: 'ग्रीष्म' },
  { id: 3, nameNe: 'असार', nameEn: 'Ashadh', season: 'ग्रीष्म' },
  { id: 4, nameNe: 'साउन', nameEn: 'Shrawan', season: 'वर्षा' },
  { id: 5, nameNe: 'भदौ', nameEn: 'Bhadra', season: 'वर्षा' },
  { id: 6, nameNe: 'असोज', nameEn: 'Ashwin', season: 'शरद' },
  { id: 7, nameNe: 'कात्तिक', nameEn: 'Kartik', season: 'शरद' },
  { id: 8, nameNe: 'मंसिर', nameEn: 'Mangsir', season: 'हेमन्त' },
  { id: 9, nameNe: 'पुस', nameEn: 'Poush', season: 'हेमन्त' },
  { id: 10, nameNe: 'माघ', nameEn: 'Magh', season: 'शिशिर' },
  { id: 11, nameNe: 'फागुन', nameEn: 'Falgun', season: 'शिशिर' },
  { id: 12, nameNe: 'चैत', nameEn: 'Chaitra', season: 'वसन्त' },
];

export const NEPALI_DAYS = [
  { id: 0, fullNe: 'आइतबार', shortNe: 'आइत', fullEn: 'Sunday', shortEn: 'Sun', isWeekend: false },
  { id: 1, fullNe: 'सोमबार', shortNe: 'सोम', fullEn: 'Monday', shortEn: 'Mon', isWeekend: false },
  { id: 2, fullNe: 'मंगलबार', shortNe: 'मंगल', fullEn: 'Tuesday', shortEn: 'Tue', isWeekend: false },
  { id: 3, fullNe: 'बुधबार', shortNe: 'बुध', fullEn: 'Wednesday', shortEn: 'Wed', isWeekend: false },
  { id: 4, fullNe: 'बिहीबार', shortNe: 'बिही', fullEn: 'Thursday', shortEn: 'Thu', isWeekend: false },
  { id: 5, fullNe: 'शुक्रबार', shortNe: 'शुक्र', fullEn: 'Friday', shortEn: 'Fri', isWeekend: false },
  { id: 6, fullNe: 'शनिबार', shortNe: 'शनि', fullEn: 'Saturday', shortEn: 'Sat', isWeekend: true },
];

// Devanagari numerals
const DEVANAGARI_DIGITS = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];

export function toDevanagari(num: number | string | undefined | null): string {
  if (num === undefined || num === null) return '';
  return num
    .toString()
    .replace(/[0-9]/g, (digit) => DEVANAGARI_DIGITS[parseInt(digit, 10)]);
}

export function fromDevanagari(str: string): string {
  return str.replace(/[०-९]/g, (char) => {
    const idx = DEVANAGARI_DIGITS.indexOf(char);
    return idx >= 0 ? idx.toString() : char;
  });
}

// Bikram Sambat Days Count per month
// Aligned with date_conversion_75e5c244.txt:
// 2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] (365 days)
// 2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30] (365 days)
export const BS_MONTH_DAYS: Record<number, number[]> = {
  2075: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2076: [31, 32, 31, 32, 31, 30, 30, 30, 29, 29, 30, 30],
  2077: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2078: [31, 31, 31, 32, 31, 31, 30, 29, 30, 29, 30, 30],
  2079: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2080: [31, 32, 31, 32, 31, 30, 30, 29, 30, 29, 30, 30],
  2081: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2082: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // Aligned with date_conversion_75e5c244.txt
  2083: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30], // Aligned with date_conversion_75e5c244.txt
  2084: [31, 31, 32, 31, 31, 30, 30, 30, 29, 30, 30, 30],
  2085: [31, 32, 31, 32, 30, 31, 30, 30, 29, 30, 30, 30],
  2086: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
  2087: [31, 31, 32, 31, 32, 30, 30, 30, 29, 30, 29, 31],
  2088: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 30, 30],
  2089: [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31],
  2090: [31, 31, 32, 31, 31, 31, 30, 29, 30, 29, 30, 30],
};

// Start of each BS year in AD (Month is 0-indexed in JS Date: 3 = April)
// 2083: "2026-04-14", 2082: "2025-04-14"
export const BS_TO_AD_ANCHORS: Record<number, { year: number; month: number; day: number }> = {
  2075: { year: 2018, month: 3, day: 14 },
  2076: { year: 2019, month: 3, day: 14 },
  2077: { year: 2020, month: 3, day: 13 },
  2078: { year: 2021, month: 3, day: 14 },
  2079: { year: 2022, month: 3, day: 14 },
  2080: { year: 2023, month: 3, day: 14 },
  2081: { year: 2024, month: 3, day: 13 },
  2082: { year: 2025, month: 3, day: 14 }, // Aligned with date_conversion_75e5c244.txt
  2083: { year: 2026, month: 3, day: 14 }, // Aligned with date_conversion_75e5c244.txt
  2084: { year: 2027, month: 3, day: 14 },
  2085: { year: 2028, month: 3, day: 13 },
  2086: { year: 2029, month: 3, day: 14 },
  2087: { year: 2030, month: 3, day: 14 },
  2088: { year: 2031, month: 3, day: 14 },
  2089: { year: 2032, month: 3, day: 13 },
  2090: { year: 2033, month: 3, day: 14 },
};

export const SUPPORTED_BS_YEARS = Object.keys(BS_MONTH_DAYS).map(Number).sort((a, b) => a - b);
export const MIN_BS_YEAR = SUPPORTED_BS_YEARS[0];
export const MAX_BS_YEAR = SUPPORTED_BS_YEARS[SUPPORTED_BS_YEARS.length - 1];

export function getDaysInBsMonth(year: number, month: number): number {
  if (BS_MONTH_DAYS[year] && BS_MONTH_DAYS[year][month - 1]) {
    return BS_MONTH_DAYS[year][month - 1];
  }
  return 30;
}

// Convert BS Date to JS Date (AD)
export function bsToAd(year: number, month: number, day: number): Date {
  const safeYear = Math.max(MIN_BS_YEAR, Math.min(MAX_BS_YEAR, year));
  const anchor = BS_TO_AD_ANCHORS[safeYear] || BS_TO_AD_ANCHORS[2083];
  const anchorDate = new Date(Date.UTC(anchor.year, anchor.month, anchor.day, 12, 0, 0));

  let daysOffset = 0;
  const monthDays = BS_MONTH_DAYS[safeYear] || BS_MONTH_DAYS[2083];
  
  for (let m = 1; m < month; m++) {
    daysOffset += monthDays[m - 1];
  }
  daysOffset += (day - 1);

  return new Date(anchorDate.getTime() + daysOffset * 24 * 60 * 60 * 1000);
}

// Convert JS Date (AD) to BS Date
export function adToBs(date: Date): BSDate {
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
  
  let matchedYear = MIN_BS_YEAR;
  for (let y = MAX_BS_YEAR; y >= MIN_BS_YEAR; y--) {
    const anchor = BS_TO_AD_ANCHORS[y];
    const anchorDate = new Date(Date.UTC(anchor.year, anchor.month, anchor.day, 12, 0, 0));
    if (utcDate >= anchorDate) {
      matchedYear = y;
      break;
    }
  }

  const anchor = BS_TO_AD_ANCHORS[matchedYear];
  const anchorDate = new Date(Date.UTC(anchor.year, anchor.month, anchor.day, 12, 0, 0));
  let diffDays = Math.round((utcDate.getTime() - anchorDate.getTime()) / (24 * 60 * 60 * 1000));

  const monthDays = BS_MONTH_DAYS[matchedYear] || BS_MONTH_DAYS[2083];
  let currentMonth = 1;

  for (let m = 0; m < 12; m++) {
    const daysInCurrentMonth = monthDays[m];
    if (diffDays < daysInCurrentMonth) {
      return {
        year: matchedYear,
        month: currentMonth,
        day: diffDays + 1,
      };
    }
    diffDays -= daysInCurrentMonth;
    currentMonth++;
  }

  return {
    year: matchedYear,
    month: 12,
    day: monthDays[11],
  };
}

export function getFirstDayOfWeekBs(year: number, month: number): number {
  const firstDayAd = bsToAd(year, month, 1);
  return firstDayAd.getUTCDay();
}

export const TITHI_NAMES = [
  'प्रतिपदा',
  'द्वितीया',
  'तृतीया',
  'चतुर्थी',
  'पञ्चमी',
  'षष्ठी',
  'सप्तमी',
  'अष्टमी',
  'नवमी',
  'दशमी',
  'एकादशी',
  'द्वादशी',
  'त्रयोदशी',
  'चतुर्दशी',
  'पूर्णिमा', // 15 Shukla
  'औंसी',    // 30 / 15 Krishna
];

export function getTithiForDate(date: Date, bsDate?: BSDate): TithiInfo {
  const resolvedBs = bsDate || adToBs(date);
  
  // 1. Direct authoritative lookup from Titihis_25c15cb6.csv for 2083 BS
  if (resolvedBs.year === 2083) {
    const key = `${resolvedBs.month}-${resolvedBs.day}`;
    const official = OFFICIAL_2083_TITHIS[key];
    if (official) {
      return {
        tithiIndex: official.tithiNum === 30 ? 15 : official.tithiNum,
        tithiName: official.tithiName,
        paksha: official.paksha,
        moonPhase: official.moonPhase,
        moonIllumination: official.tithiName === 'पूर्णिमा' ? 1 : official.tithiName === 'औंसी' ? 0 : 0.5,
      };
    }
  }

  // 2. Synodic astronomical calculation fallback for other years
  const LUNAR_PURNIMA_EPOCH_MS = new Date('2026-10-26T12:00:00Z').getTime();
  const SYNODIC_MONTH_MS = 29.53058770576 * 24 * 60 * 60 * 1000;
  const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0));
  const diffMs = utcDate.getTime() - LUNAR_PURNIMA_EPOCH_MS;
  const cycleFraction = (((diffMs % SYNODIC_MONTH_MS) + SYNODIC_MONTH_MS) % SYNODIC_MONTH_MS) / SYNODIC_MONTH_MS;

  let paksha: 'शुक्ल' | 'कृष्ण';
  let tithiIndex: number;
  let tithiName: string;

  if (cycleFraction < 0.5) {
    paksha = 'कृष्ण';
    tithiIndex = Math.floor(cycleFraction * 30) + 1;
    if (tithiIndex > 15) tithiIndex = 15;
    tithiName = tithiIndex === 15 ? 'औंसी' : TITHI_NAMES[tithiIndex - 1];
  } else {
    paksha = 'शुक्ल';
    tithiIndex = Math.floor((cycleFraction - 0.5) * 30) + 1;
    if (tithiIndex > 15) tithiIndex = 15;
    tithiName = tithiIndex === 15 ? 'पूर्णिमा' : TITHI_NAMES[tithiIndex - 1];
  }

  let moonPhase: TithiInfo['moonPhase'] = 'waxing_crescent';
  if (cycleFraction > 0.47 && cycleFraction < 0.53) moonPhase = 'new';
  else if (cycleFraction >= 0.53 && cycleFraction < 0.72) moonPhase = 'waxing_crescent';
  else if (cycleFraction >= 0.72 && cycleFraction < 0.78) moonPhase = 'first_quarter';
  else if (cycleFraction >= 0.78 && cycleFraction < 0.97) moonPhase = 'waxing_gibbous';
  else if (cycleFraction >= 0.97 || cycleFraction < 0.03) moonPhase = 'full';
  else if (cycleFraction >= 0.03 && cycleFraction < 0.22) moonPhase = 'waning_gibbous';
  else if (cycleFraction >= 0.22 && cycleFraction < 0.28) moonPhase = 'last_quarter';
  else moonPhase = 'waning_crescent';

  const moonIllumination = 0.5 * (1 + Math.cos(cycleFraction * 2 * Math.PI));

  return {
    tithiIndex,
    tithiName,
    paksha,
    moonPhase,
    moonIllumination,
  };
}

// Panchanga generator (without Sunrise / Sunset data)
export function getPanchanga(date: Date, tithi: TithiInfo): PanchangaInfo {
  return {
    tithi: `${tithi.paksha} पक्ष ${tithi.tithiName}`,
    paksha: `${tithi.paksha} पक्ष`,
    chandrama: tithi.moonPhase === 'full' ? 'पूर्ण चन्द्र' : tithi.moonPhase === 'new' ? 'अमावस्या चन्द्र' : `${tithi.paksha} चन्द्र`,
  };
}

// Calculate remaining days countdown
export function calculateDaysRemaining(targetDate: Date, fromDate: Date = new Date()): number {
  const start = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate()).getTime();
  const end = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate()).getTime();
  return Math.round((end - start) / (1000 * 60 * 60 * 24));
}

// Format days remaining
export function formatRemainingDays(daysRemaining: number): { textNe: string; textEn: string; status: 'today' | 'upcoming' | 'passed' } {
  if (daysRemaining === 0) {
    return {
      textNe: 'आजै हो!',
      textEn: 'Today!',
      status: 'today',
    };
  }
  if (daysRemaining === 1) {
    return {
      textNe: 'भोलि (१ दिन बाँकी)',
      textEn: 'Tomorrow (1 day left)',
      status: 'upcoming',
    };
  }
  if (daysRemaining > 1) {
    return {
      textNe: `${toDevanagari(daysRemaining)} दिन बाँकी`,
      textEn: `${daysRemaining} days left`,
      status: 'upcoming',
    };
  }
  const passed = Math.abs(daysRemaining);
  return {
    textNe: `${toDevanagari(passed)} दिन पहिले बितिसक्यो`,
    textEn: `${passed} days ago`,
    status: 'passed',
  };
}

export function formatAdDate(date: Date): { dayNum: number; monthShort: string; fullStr: string } {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const fullMonths = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  return {
    dayNum: date.getDate(),
    monthShort: months[date.getMonth()],
    fullStr: `${fullMonths[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`,
  };
}
