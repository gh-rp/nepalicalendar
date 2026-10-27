import React from 'react';
import { Sparkles } from 'lucide-react';
import { BSDate, CalendarEvent } from '../types';
import { 
  toDevanagari, 
  bsToAd, 
  getTithiForDate, 
  getDaysInBsMonth,
  calculateDaysRemaining,
  formatRemainingDays 
} from '../utils/nepaliCalendar';
import { getEventsForDay } from '../data/nepaliHolidaysAndFestivals';

interface SidebarWidgetsProps {
  currentBsDate: BSDate;
  todayBs: BSDate;
  todayAd: Date;
  onSelectDate: (date: BSDate) => void;
}

export const SidebarWidgets: React.FC<SidebarWidgetsProps> = ({
  currentBsDate,
  todayBs,
  todayAd,
  onSelectDate,
}) => {
  // Calculate festivals in CURRENT VIEWED MONTH
  const daysInCurrentMonth = getDaysInBsMonth(currentBsDate.year, currentBsDate.month);
  const monthFestivals: Array<{ day: number; events: CalendarEvent[]; isHoliday: boolean }> = [];

  for (let d = 1; d <= daysInCurrentMonth; d++) {
    const dayBs: BSDate = { year: currentBsDate.year, month: currentBsDate.month, day: d };
    const dayAd = bsToAd(currentBsDate.year, currentBsDate.month, d);
    const dayTithi = getTithiForDate(dayAd, dayBs);
    const { events, isPublicHoliday } = getEventsForDay(dayBs, dayTithi, dayAd.getUTCDay());
    if (events.length > 0) {
      monthFestivals.push({ day: d, events, isHoliday: isPublicHoliday });
    }
  }

  return (
    <div className="space-y-3">
      {/* Monthly Festivals & Public Holidays */}
      <div className="bg-[#fffdfa] rounded-xl border border-[#e5dacb] p-3 shadow-xs">
        <div className="flex items-center justify-between pb-2 border-b border-[#ece2d4]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#fadbd8] text-[#b91c1c] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-xs sm:text-sm text-[#342419] font-serif">
              यस महिनाका चाडपर्वहरू
            </h3>
          </div>
          <span className="text-[11px] text-[#867364]">
            {toDevanagari(monthFestivals.length)} पर्व
          </span>
        </div>

        <div className="mt-2 space-y-1.5 max-h-72 overflow-y-auto pr-0.5">
          {monthFestivals.length === 0 ? (
            <p className="text-xs text-[#8c786a] py-3 text-center">
              यस महिना कुनै विशेष चाडपर्व दर्ता छैन।
            </p>
          ) : (
            monthFestivals.map((item) => {
              const targetBsDate: BSDate = {
                year: currentBsDate.year,
                month: currentBsDate.month,
                day: item.day,
              };
              const adDate = bsToAd(targetBsDate.year, targetBsDate.month, targetBsDate.day);
              const daysRemaining = calculateDaysRemaining(adDate, todayAd);
              const remainingInfo = formatRemainingDays(daysRemaining);

              return (
                <div
                  key={`month-fest-${item.day}`}
                  onClick={() => onSelectDate(targetBsDate)}
                  className="p-1.5 sm:p-2 rounded-lg border border-[#e8ded2] hover:border-[#b91c1c] bg-[#fbf7f0] hover:bg-[#faece9] cursor-pointer transition-colors flex items-center justify-between gap-1.5 group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="w-5 h-5 rounded bg-[#fffdf9] border border-[#e1d5c5] font-bold text-[11px] text-[#b91c1c] flex items-center justify-center shrink-0">
                      {toDevanagari(item.day)}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-[#322319] truncate group-hover:text-[#b91c1c] transition-colors">
                        {item.events[0]?.title}
                      </h4>
                      <span className="text-[10px] text-[#857263]">
                        {item.events[0]?.isOfficialGovHoliday ? 'सार्वजनिक बिदा' : 'चाडपर्व'}
                      </span>
                    </div>
                  </div>

                  {daysRemaining >= 0 && daysRemaining <= 60 && (
                    <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#ebdcd0] text-[#4d3b2e]">
                      {remainingInfo.textNe}
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
