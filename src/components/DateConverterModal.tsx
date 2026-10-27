import React, { useState } from 'react';
import { X, ArrowLeftRight, Calendar } from 'lucide-react';
import { BSDate } from '../types';
import { 
  NEPALI_MONTHS, 
  NEPALI_DAYS,
  SUPPORTED_BS_YEARS, 
  toDevanagari, 
  getDaysInBsMonth, 
  bsToAd, 
  adToBs, 
  getTithiForDate, 
  formatAdDate 
} from '../utils/nepaliCalendar';

interface DateConverterModalProps {
  onClose: () => void;
  onNavigateToDate: (date: BSDate) => void;
}

export const DateConverterModal: React.FC<DateConverterModalProps> = ({
  onClose,
  onNavigateToDate,
}) => {
  const [mode, setMode] = useState<'bsToAd' | 'adToBs'>('bsToAd');

  // BS to AD state
  const [bsYear, setBsYear] = useState<number>(2083);
  const [bsMonth, setBsMonth] = useState<number>(7);
  const [bsDay, setBsDay] = useState<number>(10);

  // AD to BS state
  const today = new Date();
  const [adYear, setAdYear] = useState<number>(today.getFullYear());
  const [adMonth, setAdMonth] = useState<number>(today.getMonth() + 1);
  const [adDay, setAdDay] = useState<number>(today.getDate());

  const maxBsDays = getDaysInBsMonth(bsYear, bsMonth);

  // Computed results
  const convertedAdDate = bsToAd(bsYear, bsMonth, Math.min(bsDay, maxBsDays));
  const convertedAdFormatted = formatAdDate(convertedAdDate);
  const bsTithi = getTithiForDate(convertedAdDate, { year: bsYear, month: bsMonth, day: bsDay });
  const bsDayOfWeek = NEPALI_DAYS[convertedAdDate.getUTCDay()];

  const safeAdDate = new Date(adYear, adMonth - 1, adDay);
  const convertedBsDate = adToBs(safeAdDate);
  const adTithi = getTithiForDate(safeAdDate, convertedBsDate);
  const adDayOfWeek = NEPALI_DAYS[safeAdDate.getDay()];
  const convertedBsMonthInfo = NEPALI_MONTHS.find((m) => m.id === convertedBsDate.month);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] w-full max-w-md rounded-2xl border border-[#e5dacb] shadow-xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e8dfd2] bg-[#f8f2e7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b45309] text-white flex items-center justify-center">
              <ArrowLeftRight className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#322319]">
                मिति रूपान्तरण (Date Converter)
              </h2>
              <p className="text-[11px] text-[#7d695b]">
                Convert Bikram Sambat (BS) & Anno Domini (AD)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#887465] hover:text-[#322319] hover:bg-[#ede3d4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="p-2 border-b border-[#e8dfd2] bg-[#f6eee2] flex items-center gap-1.5 text-xs">
          <button
            onClick={() => setMode('bsToAd')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'bsToAd'
                ? 'bg-[#fffdfa] text-[#322319] shadow-xs'
                : 'text-[#7d695b] hover:text-[#322319]'
            }`}
          >
            वि.सं. बाट सन् (BS ➔ AD)
          </button>
          <button
            onClick={() => setMode('adToBs')}
            className={`flex-1 py-1.5 rounded-lg font-bold transition-all ${
              mode === 'adToBs'
                ? 'bg-[#fffdfa] text-[#322319] shadow-xs'
                : 'text-[#7d695b] hover:text-[#322319]'
            }`}
          >
            सन् बाट वि.सं. (AD ➔ BS)
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-4">
          
          {mode === 'bsToAd' ? (
            <div className="space-y-3.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4d3a2d]">
                नेपाली मिति चयन गर्नुहोस्:
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={bsYear}
                  onChange={(e) => setBsYear(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {SUPPORTED_BS_YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                      {toDevanagari(yr)} ({yr})
                    </option>
                  ))}
                </select>

                <select
                  value={bsMonth}
                  onChange={(e) => setBsMonth(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {NEPALI_MONTHS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.nameNe}
                    </option>
                  ))}
                </select>

                <select
                  value={bsDay}
                  onChange={(e) => setBsDay(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {Array.from({ length: maxBsDays }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {toDevanagari(d)} गते
                    </option>
                  ))}
                </select>
              </div>

              {/* Result Card */}
              <div className="p-4 rounded-xl bg-[#fbf5eb] border border-[#e5d6c2]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8b6534] mb-0.5">
                  अंग्रेजी मिति (AD Equivalent):
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-[#342419]">
                  {convertedAdFormatted.fullStr}
                </h3>
                <p className="text-xs text-[#6e594a] mt-1">
                  वार: <strong>{bsDayOfWeek.fullNe}</strong> ({bsDayOfWeek.fullEn})
                </p>
                <p className="text-xs text-[#6e594a]">
                  तिथि: <strong>{bsTithi.paksha} पक्ष {bsTithi.tithiName}</strong>
                </p>

                <button
                  onClick={() => {
                    onNavigateToDate({ year: bsYear, month: bsMonth, day: bsDay });
                    onClose();
                  }}
                  className="mt-3 w-full py-2 rounded-xl bg-[#b45309] hover:bg-[#92400e] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  यो मिति क्यालेन्डरमा हेर्नुहोस्
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#4d3a2d]">
                अंग्रेजी मिति चयन गर्नुहोस्:
              </label>

              <div className="grid grid-cols-3 gap-2">
                <select
                  value={adYear}
                  onChange={(e) => setAdYear(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {Array.from({ length: 15 }, (_, i) => 2018 + i).map((yr) => (
                    <option key={yr} value={yr}>
                      {yr} AD
                    </option>
                  ))}
                </select>

                <select
                  value={adMonth}
                  onChange={(e) => setAdMonth(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {[
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                  ].map((m, idx) => (
                    <option key={idx + 1} value={idx + 1}>
                      {idx + 1} - {m}
                    </option>
                  ))}
                </select>

                <select
                  value={adDay}
                  onChange={(e) => setAdDay(Number(e.target.value))}
                  className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
                >
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>
                      {d} Day
                    </option>
                  ))}
                </select>
              </div>

              {/* Result Card */}
              <div className="p-4 rounded-xl bg-[#faece9] border border-[#f5c6cb]">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#b91c1c] mb-0.5">
                  नेपाली मिति (BS Equivalent):
                </span>
                <h3 className="text-lg sm:text-xl font-bold font-serif text-[#342419]">
                  {toDevanagari(convertedBsDate.year)} {convertedBsMonthInfo?.nameNe} {toDevanagari(convertedBsDate.day)} गते
                </h3>
                <p className="text-xs text-[#6e594a] mt-1">
                  वार: <strong>{adDayOfWeek.fullNe}</strong> ({adDayOfWeek.fullEn})
                </p>
                <p className="text-xs text-[#6e594a]">
                  तिथि: <strong>{adTithi.paksha} पक्ष {adTithi.tithiName}</strong>
                </p>

                <button
                  onClick={() => {
                    onNavigateToDate(convertedBsDate);
                    onClose();
                  }}
                  className="mt-3 w-full py-2 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  यो मिति क्यालेन्डरमा हेर्नुहोस्
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
