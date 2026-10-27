import React from 'react';
import { ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { BSDate } from '../types';
import { 
  NEPALI_MONTHS, 
  toDevanagari, 
  SUPPORTED_BS_YEARS, 
  getDaysInBsMonth, 
  bsToAd, 
  formatAdDate 
} from '../utils/nepaliCalendar';

interface CalendarMonthNavProps {
  currentBsDate: BSDate;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export const CalendarMonthNav: React.FC<CalendarMonthNavProps> = ({
  currentBsDate,
  onYearChange,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
}) => {
  const currentMonthInfo = NEPALI_MONTHS.find((m) => m.id === currentBsDate.month) || NEPALI_MONTHS[0];
  const daysInMonth = getDaysInBsMonth(currentBsDate.year, currentBsDate.month);
  
  const firstDayAd = bsToAd(currentBsDate.year, currentBsDate.month, 1);
  const lastDayAd = bsToAd(currentBsDate.year, currentBsDate.month, daysInMonth);
  const firstAdFormatted = formatAdDate(firstDayAd);
  const lastAdFormatted = formatAdDate(lastDayAd);

  return (
    <div className="w-full bg-[#fffdfa] rounded-xl border border-[#e5dacb] px-2.5 sm:px-3 py-1.5 sm:py-2 shadow-xs mb-2.5 transition-colors">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Month & Year Selectors with Prev/Next buttons (Centered on mobile, aligned on desktop) */}
        <div className="w-full sm:w-auto flex items-center justify-center sm:justify-start gap-1 sm:gap-1.5 flex-nowrap">
          
          {/* Previous Month */}
          <button
            onClick={onPrevMonth}
            aria-label="अघिल्लो महिना"
            className="p-1 sm:p-1.5 rounded-lg border border-[#e1d5c5] bg-[#f7f0e5] hover:bg-[#ece2d3] text-[#4b382a] transition-colors active:scale-95 shrink-0"
            title="अघिल्लो महिना"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Month Dropdown */}
          <div className="relative">
            <select
              value={currentBsDate.month}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              className="appearance-none font-bold text-sm sm:text-base text-[#322319] bg-[#f7f0e5] border border-[#e1d5c5] rounded-lg px-2 sm:px-2.5 py-1 pr-5 sm:pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#b91c1c] font-serif"
            >
              {NEPALI_MONTHS.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#fffdfa] text-[#322319] font-sans text-xs sm:text-sm">
                  {m.nameNe} ({m.nameEn})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[#887465] text-[10px]">
              ▼
            </div>
          </div>

          {/* Year Dropdown */}
          <div className="relative">
            <select
              value={currentBsDate.year}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="appearance-none font-bold text-sm sm:text-base text-[#b91c1c] bg-[#f7f0e5] border border-[#e1d5c5] rounded-lg px-2 sm:px-2.5 py-1 pr-5 sm:pr-6 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
            >
              {SUPPORTED_BS_YEARS.map((yr) => (
                <option key={yr} value={yr} className="bg-[#fffdfa] text-[#322319] font-sans text-xs sm:text-sm">
                  {toDevanagari(yr)} ({yr})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-[#b91c1c] text-[10px]">
              ▼
            </div>
          </div>

          {/* Next Month */}
          <button
            onClick={onNextMonth}
            aria-label="पछिल्लो महिना"
            className="p-1 sm:p-1.5 rounded-lg border border-[#e1d5c5] bg-[#f7f0e5] hover:bg-[#ece2d3] text-[#4b382a] transition-colors active:scale-95 shrink-0"
            title="पछिल्लो महिना"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Season & Days (on medium screens) */}
          <span className="hidden md:inline-block text-xs text-[#7d695b] pl-1.5">
            ऋतु: <strong className="text-[#4b382a]">{currentMonthInfo.season}</strong> ({toDevanagari(daysInMonth)} दिन)
          </span>

        </div>

        {/* Gregorian AD Range */}
        <div className="w-full sm:w-auto text-[11px] sm:text-xs text-[#715d4e] flex items-center justify-center sm:justify-end gap-1.5 bg-[#f6eee2] px-2.5 py-0.5 sm:py-1 rounded-lg border border-[#e3d7c7]">
          <CalendarDays className="w-3.5 h-3.5 text-[#a89382]" />
          <span>
            {firstAdFormatted.monthShort} {firstAdFormatted.dayNum} – {lastAdFormatted.monthShort} {lastAdFormatted.dayNum}, {lastDayAd.getFullYear()} AD
          </span>
        </div>

      </div>
    </div>
  );
};
