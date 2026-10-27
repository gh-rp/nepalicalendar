import React from 'react';
import { 
  BSDate, 
  PersonalEvent, 
  CalendarEvent, 
  TithiInfo 
} from '../types';
import { 
  NEPALI_DAYS, 
  toDevanagari, 
  getDaysInBsMonth, 
  getFirstDayOfWeekBs, 
  bsToAd, 
  getTithiForDate, 
  formatAdDate,
  calculateDaysRemaining,
  formatRemainingDays
} from '../utils/nepaliCalendar';
import { getEventsForDay } from '../data/nepaliHolidaysAndFestivals';

interface CalendarGridProps {
  currentBsDate: BSDate;
  todayBs: BSDate;
  todayAd: Date;
  personalEvents: PersonalEvent[];
  selectedDate: BSDate | null;
  onSelectDate: (date: BSDate) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentBsDate,
  todayBs,
  todayAd,
  personalEvents,
  selectedDate,
  onSelectDate,
}) => {
  const { year, month } = currentBsDate;
  const daysInMonth = getDaysInBsMonth(year, month);
  const startDayOfWeek = getFirstDayOfWeekBs(year, month); // 0 = Sun, 6 = Sat

  // Days array for current month
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  // Offset array for leading empty slots before day 1
  const emptySlots = Array.from({ length: startDayOfWeek }, (_, i) => i);

  return (
    <div className="bg-[#fffdfa] rounded-xl border border-[#e5dacb] shadow-xs overflow-hidden">
      
      {/* Weekday Headers */}
      <div className="grid grid-cols-7 border-b border-[#e5dacb] bg-[#f5ede1] text-center">
        {NEPALI_DAYS.map((day) => {
          const isSaturday = day.id === 6;
          return (
            <div
              key={day.id}
              className={`py-1.5 sm:py-2 px-1 border-r last:border-r-0 border-[#e8dfd2] ${
                isSaturday ? 'bg-[#faece9]' : ''
              }`}
            >
              <span
                className={`block text-xs sm:text-sm font-bold font-serif ${
                  isSaturday
                    ? 'text-[#b91c1c]'
                    : 'text-[#38271c]'
                }`}
              >
                {day.shortNe}
                <span className="hidden md:inline font-normal">{day.fullNe.slice(day.shortNe.length)}</span>
              </span>
              <span
                className={`block text-[9px] sm:text-[10px] uppercase tracking-wider ${
                  isSaturday
                    ? 'text-[#c2410c] font-medium'
                    : 'text-[#8c7767]'
                }`}
              >
                {day.shortEn}
              </span>
            </div>
          );
        })}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7 auto-rows-fr bg-[#e5dacb] gap-[1px]">
        
        {/* Leading empty cells */}
        {emptySlots.map((slot) => (
          <div
            key={`empty-${slot}`}
            className="min-h-[68px] sm:min-h-[76px] lg:min-h-[82px] bg-[#f8f3eb]/60"
          />
        ))}

        {/* Days of the month */}
        {daysArray.map((dayNum) => {
          const dayBsDate: BSDate = { year, month, day: dayNum };
          const dayAdDate = bsToAd(year, month, dayNum);
          const dayOfWeek = dayAdDate.getUTCDay();
          const isSaturday = dayOfWeek === 6;
          const adInfo = formatAdDate(dayAdDate);

          // Calibrated Tithi & Events
          const tithi = getTithiForDate(dayAdDate, dayBsDate);
          const { events: dayHolidays, isPublicHoliday } = getEventsForDay(dayBsDate, tithi, dayOfWeek);
          
          // Personal events for this date
          const dayPersonalEvents = personalEvents.filter(
            (e) => e.bsYear === year && e.bsMonth === month && e.bsDay === dayNum
          );
          const hasPersonalEvent = dayPersonalEvents.length > 0;
          const personalEventColor = hasPersonalEvent ? dayPersonalEvents[0].color : null;

          // Today check
          const isToday =
            year === todayBs.year &&
            month === todayBs.month &&
            dayNum === todayBs.day;

          // Selected check
          const isSelected =
            selectedDate?.year === year &&
            selectedDate?.month === month &&
            selectedDate?.day === dayNum;

          // Countdown calculation
          const daysRemaining = calculateDaysRemaining(dayAdDate, todayAd);
          const remainingInfo = formatRemainingDays(daysRemaining);

          const isPurnima = tithi.tithiName === 'पूर्णिमा';
          const isAausi = tithi.tithiName === 'औंसी';

          // User requested: "when i select a color, i want it to fill the whole box instead of just colored dot, so it's easily visible"
          const boxStyle: React.CSSProperties = {};
          if (personalEventColor) {
            // Apply full box background tint with color accent
            boxStyle.backgroundColor = `${personalEventColor}24`; // 14% tint fill
            boxStyle.borderColor = `${personalEventColor}80`;
          }

          return (
            <div
              key={`day-${dayNum}`}
              onClick={() => onSelectDate(dayBsDate)}
              style={boxStyle}
              className={`relative min-h-[68px] sm:min-h-[76px] lg:min-h-[82px] p-1 sm:p-1.5 cursor-pointer select-none transition-all duration-150 flex flex-col justify-between group ${
                personalEventColor
                  ? 'border border-solid'
                  : isSaturday
                  ? 'bg-[#fcf5f3]'
                  : 'bg-[#fffdfa]'
              } ${
                isToday 
                  ? 'ring-2 ring-inset ring-[#b91c1c] font-bold shadow-xs' 
                  : ''
              } ${
                isSelected 
                  ? 'ring-2 ring-inset ring-[#d97706]' 
                  : ''
              } hover:brightness-95`}
            >
              
              {/* Top Row: Devanagari BS Day Number + Tiny English AD Day in the same box */}
              <div className="flex items-start justify-between leading-none">
                
                {/* Devanagari Nepali Number */}
                <div className="flex items-baseline gap-1">
                  <span
                    className={`text-lg sm:text-xl lg:text-2xl font-extrabold font-serif ${
                      isSaturday || isPublicHoliday
                        ? 'text-[#b91c1c]'
                        : 'text-[#342419]'
                    }`}
                  >
                    {toDevanagari(dayNum)}
                  </span>

                  {/* Today subtle indicator */}
                  {isToday && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#b91c1c]" title="आज (Today)" />
                  )}
                </div>

                {/* Tiny AD Day in the same box */}
                <div className="text-right">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#8e7a6b]">
                    {adInfo.dayNum}
                    {dayNum === 1 || adInfo.dayNum === 1 ? (
                      <span className="text-[8px] uppercase ml-0.5 text-[#5e4b3c] font-bold">
                        {adInfo.monthShort}
                      </span>
                    ) : null}
                  </span>
                </div>
              </div>

              {/* Middle Row: Tithi & Special Moon indicator */}
              <div className="my-0.5 flex items-center justify-between text-[9px] sm:text-[10px] text-[#6b584a] leading-none">
                <span className="truncate font-nepali">
                  {tithi.tithiName}
                </span>

                {isPurnima && (
                  <span className="text-amber-600 text-[10px]" title="पूर्णिमा">
                    🌕
                  </span>
                )}
                {isAausi && (
                  <span className="text-[#8c786a] text-[10px]" title="औंसी">
                    🌑
                  </span>
                )}
              </div>

              {/* Bottom: Event chips / Full color fill display */}
              <div className="mt-auto flex flex-col gap-0.5 overflow-hidden">
                
                {/* Personal Event Title (Prominent with colored label since the whole box is tinted) */}
                {hasPersonalEvent && (
                  <div 
                    title={dayPersonalEvents[0].title}
                    className="truncate text-[9px] sm:text-[10px] px-1 py-0.2 rounded font-bold text-white shadow-2xs"
                    style={{ backgroundColor: personalEventColor || '#2563eb' }}
                  >
                    {dayPersonalEvents[0].title}
                    {dayPersonalEvents.length > 1 && (
                      <span className="ml-0.5 text-[8px] opacity-80">+{dayPersonalEvents.length - 1}</span>
                    )}
                  </div>
                )}

                {/* Public Holiday or Festival Tag */}
                {!hasPersonalEvent && dayHolidays.slice(0, 1).map((evt) => (
                  <div
                    key={evt.id}
                    title={`${evt.title} ${evt.isOfficialGovHoliday ? '(सार्वजनिक बिदा)' : ''}`}
                    className={`truncate text-[8px] sm:text-[9px] px-1 py-0.2 rounded font-medium ${
                      evt.isOfficialGovHoliday
                        ? 'bg-[#fadbd8] text-[#900c3f] border border-[#f5b7b1]'
                        : 'bg-[#fdebd0] text-[#935116] border border-[#fad7a0]'
                    }`}
                  >
                    {evt.title}
                  </div>
                ))}

              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
};
