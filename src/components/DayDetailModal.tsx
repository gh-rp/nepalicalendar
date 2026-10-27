import React from 'react';
import { 
  X, 
  Clock, 
  Moon, 
  Trash2, 
  Plus, 
  Sparkles 
} from 'lucide-react';
import { 
  BSDate, 
  PersonalEvent 
} from '../types';
import { 
  NEPALI_MONTHS, 
  NEPALI_DAYS, 
  toDevanagari, 
  bsToAd, 
  getTithiForDate, 
  getPanchanga, 
  formatAdDate,
  calculateDaysRemaining,
  formatRemainingDays
} from '../utils/nepaliCalendar';
import { getEventsForDay } from '../data/nepaliHolidaysAndFestivals';

interface DayDetailModalProps {
  date: BSDate;
  todayBs: BSDate;
  todayAd: Date;
  personalEvents: PersonalEvent[];
  onClose: () => void;
  onAddEventForDate: (date: BSDate) => void;
  onDeletePersonalEvent: (id: string) => void;
}

export const DayDetailModal: React.FC<DayDetailModalProps> = ({
  date,
  todayBs,
  todayAd,
  personalEvents,
  onClose,
  onAddEventForDate,
  onDeletePersonalEvent,
}) => {
  const adDate = bsToAd(date.year, date.month, date.day);
  const dayOfWeek = adDate.getUTCDay();
  const dayInfo = NEPALI_DAYS[dayOfWeek];
  const monthInfo = NEPALI_MONTHS.find((m) => m.id === date.month) || NEPALI_MONTHS[0];
  const adFormatted = formatAdDate(adDate);

  const tithi = getTithiForDate(adDate, date);
  const panchanga = getPanchanga(adDate, tithi);
  const { events: holidays, isPublicHoliday } = getEventsForDay(date, tithi, dayOfWeek);

  const dayPersonalEvents = personalEvents.filter(
    (e) => e.bsYear === date.year && e.bsMonth === date.month && e.bsDay === date.day
  );

  const daysRemaining = calculateDaysRemaining(adDate, todayAd);
  const countdown = formatRemainingDays(daysRemaining);

  const isToday =
    date.year === todayBs.year &&
    date.month === todayBs.month &&
    date.day === todayBs.day;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] w-full max-w-md rounded-2xl border border-[#e5dacb] shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Banner */}
        <div className={`p-4 sm:p-5 border-b ${
          isPublicHoliday 
            ? 'bg-[#b91c1c] text-white' 
            : 'bg-[#3b2a1f] text-[#f7f2ea]'
        }`}>
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/20">
                  {isPublicHoliday ? 'सार्वजनिक बिदा' : 'कार्यदिन'}
                </span>
                {isToday && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    आज (Today)
                  </span>
                )}
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold font-serif">
                {toDevanagari(date.year)} {monthInfo.nameNe} {toDevanagari(date.day)} गते
              </h2>
              <p className="text-xs opacity-90 font-medium">
                {dayInfo.fullNe} ({dayInfo.fullEn}) • {adFormatted.fullStr}
              </p>
            </div>
            
            <button
              onClick={onClose}
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Countdown Pill */}
          <div className="mt-3 pt-2.5 border-t border-white/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{countdown.textNe} ({countdown.textEn})</span>
            </div>
            <span className="opacity-80 text-[11px]">
              {daysRemaining >= 0 ? `+${daysRemaining}d` : `${daysRemaining}d`}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4">
          
          {/* Tithi Card (Sunrise & Sunset removed) */}
          <div className="p-3.5 rounded-xl bg-[#f8f3ea] border border-[#e8dfd2] flex items-center justify-between">
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#867364]">
                तिथि (Tithi & Paksha)
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-bold text-[#322319] text-base sm:text-lg font-serif">
                  {tithi.tithiName}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#f1e6d8] text-[#6b584a] font-semibold border border-[#e0d3c2]">
                  {tithi.paksha} पक्ष
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-[#6b584a] font-medium bg-[#fffdfa] px-3 py-1.5 rounded-lg border border-[#e5dacb]">
              <Moon className="w-4 h-4 text-[#d97706]" />
              <span>{panchanga.chandrama}</span>
            </div>
          </div>

          {/* Holidays & Festivals */}
          {holidays.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#735f4f] mb-2 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#b91c1c]" />
                चाडपर्व तथा दिवसहरू
              </h3>
              <div className="space-y-1.5">
                {holidays.map((h) => (
                  <div
                    key={h.id}
                    className={`p-3 rounded-xl border ${
                      h.isOfficialGovHoliday
                        ? 'bg-[#faece9] border-[#f5b7b1]'
                        : 'bg-[#fcf3e8] border-[#fad7a0]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-bold text-[#322319] text-sm">
                        {h.title}
                      </h4>
                      {h.isOfficialGovHoliday && (
                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.2 rounded bg-[#b91c1c] text-white">
                          सार्वजनिक बिदा
                        </span>
                      )}
                    </div>
                    {h.description && (
                      <p className="text-xs text-[#6e5949] mt-1 leading-relaxed">
                        {h.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Personal Events Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#735f4f]">
                व्यक्तिगत कार्यक्रम (Personal Events)
              </h3>
              <span className="text-xs text-[#8c7869]">
                {dayPersonalEvents.length} कार्यक्रम
              </span>
            </div>

            {dayPersonalEvents.length === 0 ? (
              <div className="p-3.5 rounded-xl border border-dashed border-[#dcd0c0] text-center bg-[#fbf7ee]">
                <p className="text-xs text-[#715c4d] mb-1.5">
                  यस दिन कुनै व्यक्तिगत कार्यक्रम छैन।
                </p>
                <button
                  onClick={() => onAddEventForDate(date)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#b91c1c] hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" />
                  कार्यक्रम थप्नुहोस्
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                {dayPersonalEvents.map((pe) => (
                  <div
                    key={pe.id}
                    style={{ borderColor: `${pe.color}70`, backgroundColor: `${pe.color}14` }}
                    className="p-3 rounded-xl border flex items-start justify-between gap-2.5"
                  >
                    <div className="flex items-start gap-2.5">
                      <div
                        className="w-3.5 h-3.5 rounded-full mt-0.5 shrink-0"
                        style={{ backgroundColor: pe.color }}
                      />
                      <div>
                        <h4 className="font-bold text-[#322319] text-sm">
                          {pe.title}
                        </h4>
                        {pe.notes && (
                          <p className="text-xs text-[#6e5a4b] mt-0.5">
                            {pe.notes}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => onDeletePersonalEvent(pe.id)}
                      title="मेटाउनुहोस्"
                      className="p-1 rounded-md text-[#8c786a] hover:text-[#b91c1c] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  onClick={() => onAddEventForDate(date)}
                  className="w-full py-1.5 border border-dashed border-[#d8cab7] rounded-xl text-xs font-semibold text-[#5a483a] hover:bg-[#f6efe4] flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  अर्को कार्यक्रम थप्नुहोस्
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-[#f8f2e7] border-t border-[#e8dfd2] flex items-center justify-between">
          <span className="text-xs text-[#715d4e]">
            वि.सं. {toDevanagari(date.year)} • {adDate.getFullYear()} AD
          </span>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-[#4a372a] hover:bg-[#342419] text-white text-xs font-semibold transition-colors"
          >
            बन्द गर्नुहोस्
          </button>
        </div>

      </div>
    </div>
  );
};
