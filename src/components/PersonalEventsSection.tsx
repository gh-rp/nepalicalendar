import React from 'react';
import { Plus, Trash2, Calendar } from 'lucide-react';
import { BSDate, PersonalEvent } from '../types';
import { 
  toDevanagari, 
  NEPALI_MONTHS, 
  formatAdDate 
} from '../utils/nepaliCalendar';
import { getUpcomingPersonalEvents, UpcomingItem } from '../utils/personalEventsStorage';

interface PersonalEventsSectionProps {
  personalEvents: PersonalEvent[];
  todayBs: BSDate;
  todayAd: Date;
  onOpenAddEvent: () => void;
  onDeleteEvent: (id: string) => void;
  onSelectDate: (date: BSDate) => void;
}

export const PersonalEventsSection: React.FC<PersonalEventsSectionProps> = ({
  personalEvents,
  todayBs,
  todayAd,
  onOpenAddEvent,
  onDeleteEvent,
  onSelectDate,
}) => {
  const upcomingItems = getUpcomingPersonalEvents(personalEvents, todayAd);
  
  const futureItems = upcomingItems.filter((i) => i.daysRemaining >= 0);
  const passedItems = upcomingItems.filter((i) => i.daysRemaining < 0);

  return (
    <section className="mt-2.5 bg-[#fffdfa] rounded-xl border border-[#e5dacb] p-3 sm:p-3.5 shadow-xs">
      
      {/* Section Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#e8dfd2] mb-2.5">
        <h2 className="text-sm sm:text-base font-bold text-[#342419] font-serif">
          Upcoming Events
        </h2>

        {/* Sepia + Button (no red) */}
        <button
          onClick={onOpenAddEvent}
          title="Add Event"
          aria-label="Add Event"
          className="p-1 sm:px-2 sm:py-1 rounded-lg bg-[#f0e6d8] hover:bg-[#e6d8c6] text-[#423125] border border-[#dfd2bf] text-xs font-bold transition-colors active:scale-95 flex items-center gap-1"
        >
          <Plus className="w-3.5 h-3.5 text-[#342419]" />
        </button>
      </div>

      {/* Events List in consistent sequence */}
      {futureItems.length === 0 ? (
        <div className="p-3 text-center rounded-lg bg-[#f8f3ea] border border-dashed border-[#e3d7c7]">
          <p className="text-xs text-[#715c4d] mb-1">
            कुनै आगामी कार्यक्रम छैन।
          </p>
          <button
            onClick={onOpenAddEvent}
            className="text-xs font-bold text-[#594435] hover:underline"
          >
            + नयाँ कार्यक्रम थप्नुहोस् (Add Event)
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {futureItems.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectDate({ year: evt.bsYear, month: evt.bsMonth, day: evt.bsDay })}
              style={{ 
                borderColor: `${evt.color}65`, 
                backgroundColor: `${evt.color}14` 
              }}
              className="p-2.5 rounded-lg border transition-all cursor-pointer hover:shadow-xs group flex items-start justify-between gap-2"
            >
              <div className="min-w-0 flex-1">
                {/* Date header */}
                <div className="flex items-center gap-1.5 text-[11px] text-[#6b584b] mb-0.5">
                  <span 
                    className="w-2 h-2 rounded-full shrink-0" 
                    style={{ backgroundColor: evt.color }} 
                  />
                  <span className="font-semibold truncate">
                    {toDevanagari(evt.bsDay)} {NEPALI_MONTHS.find(m => m.id === evt.bsMonth)?.nameNe} ({formatAdDate(evt.adDate).monthShort} {evt.adDate.getDate()})
                  </span>
                </div>
                
                {/* Event Title */}
                <h3 className="text-xs sm:text-sm font-bold text-[#322319] truncate group-hover:text-[#8d3d20] transition-colors">
                  {evt.title}
                </h3>

                {evt.notes && (
                  <p className="text-[10px] sm:text-[11px] text-[#715d4e] truncate mt-0.5">
                    {evt.notes}
                  </p>
                )}
              </div>

              {/* Countdown tag with event's shade & delete */}
              <div className="flex flex-col items-end justify-between gap-1 shrink-0">
                <span 
                  className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold text-white shadow-2xs"
                  style={{ backgroundColor: evt.color }}
                >
                  {evt.countdownTextNe}
                </span>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteEvent(evt.id);
                  }}
                  title="मेटाउनुहोस्"
                  className="p-0.5 text-[#9c897a] hover:text-[#b91c1c] transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Passed events if any */}
      {passedItems.length > 0 && (
        <div className="mt-2 pt-1.5 border-t border-[#f0e6d8] flex items-center justify-between text-[11px] text-[#8c786a]">
          <span>पुराना कार्यक्रम ({toDevanagari(passedItems.length)})</span>
          <button
            onClick={() => {
              passedItems.forEach((p) => onDeleteEvent(p.id));
            }}
            className="text-[10px] text-[#8e4521] hover:underline"
          >
            हटाउनुहोस्
          </button>
        </div>
      )}

    </section>
  );
};
