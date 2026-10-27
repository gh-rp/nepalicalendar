import React from 'react';
import { Plus, ArrowLeftRight, CalendarCheck2 } from 'lucide-react';
import { BSDate } from '../types';
import { toDevanagari, NEPALI_MONTHS, NEPALI_DAYS, formatAdDate } from '../utils/nepaliCalendar';

interface HeaderProps {
  currentBsDate: BSDate;
  todayBs: BSDate;
  todayAd: Date;
  onGoToToday: () => void;
  onOpenAddEvent: () => void;
  onOpenConverter: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentBsDate,
  todayBs,
  todayAd,
  onGoToToday,
  onOpenAddEvent,
  onOpenConverter,
}) => {
  const todayAdFormatted = formatAdDate(todayAd);
  const todayMonthNe = NEPALI_MONTHS.find((m) => m.id === todayBs.month)?.nameNe || '';
  const todayDayOfWeek = NEPALI_DAYS[todayAd.getDay()]?.fullNe || '';

  return (
    <header className="sticky top-0 z-30 bg-[#fffdf9]/95 backdrop-blur-md border-b border-[#e7ddd0] shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-13 sm:h-14 gap-2">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[#b91c1c] text-white flex items-center justify-center shadow-xs">
              <CalendarCheck2 className="w-5 h-5" />
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#342419] font-serif">
                पात्रो
              </h1>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#f1e6d8] text-[#853a25] border border-[#e4d3c0]">
                वि.सं. {toDevanagari(currentBsDate.year)}
              </span>
            </div>
          </div>

          {/* Today Banner (Center) */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4ebe0] border border-[#e3d7c7] text-xs text-[#523e31]">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-[#846f60]">आज:</span>
            <span className="font-semibold text-[#38271c]">
              {toDevanagari(todayBs.year)} {todayMonthNe} {toDevanagari(todayBs.day)} गते, {todayDayOfWeek}
            </span>
            <span className="text-[#bfae9f]">|</span>
            <span className="font-medium text-[#6c594b]">
              {todayAdFormatted.monthShort} {todayAdFormatted.dayNum}, {todayAd.getFullYear()}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            
            {/* Jump to Today */}
            <button
              onClick={onGoToToday}
              title="आजको मितिमा जानुहोस्"
              className="px-2.5 py-1.5 rounded-lg bg-[#f0e6d8] hover:bg-[#e6d8c6] text-[#423125] border border-[#dfd2bf] text-xs font-semibold transition-colors"
            >
              आज (Today)
            </button>

            {/* Date Converter */}
            <button
              onClick={onOpenConverter}
              title="वि.सं. र सन् मिति रूपान्तरण"
              className="px-2.5 py-1.5 rounded-lg bg-[#f0e6d8] hover:bg-[#e6d8c6] text-[#423125] border border-[#dfd2bf] text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-[#b45309]" />
              <span className="hidden sm:inline">मिति रूपान्तरण</span>
            </button>


            {/* Add Personal Event Button - Sepia with just + icon */}
            <button
              onClick={onOpenAddEvent}
              title="नयाँ व्यक्तिगत कार्यक्रम थप्नुहोस् (Add Event)"
              aria-label="Add Event"
              className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#f0e6d8] hover:bg-[#e6d8c6] text-[#423125] border border-[#dfd2bf] text-xs font-bold transition-colors active:scale-95 flex items-center justify-center"
            >
              <Plus className="w-4 h-4 text-[#342419]" />
            </button>

          </div>
        </div>
      </div>
    </header>
  );
};
