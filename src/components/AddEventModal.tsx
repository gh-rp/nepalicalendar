import React, { useState, useEffect } from 'react';
import { X, Calendar, FileText, Palette } from 'lucide-react';
import { BSDate, PersonalEvent } from '../types';
import { 
  NEPALI_MONTHS, 
  SUPPORTED_BS_YEARS, 
  toDevanagari, 
  getDaysInBsMonth, 
  bsToAd, 
  formatAdDate,
  calculateDaysRemaining,
  formatRemainingDays
} from '../utils/nepaliCalendar';

interface AddEventModalProps {
  initialDate: BSDate;
  todayBs: BSDate;
  todayAd: Date;
  onClose: () => void;
  onSave: (event: Omit<PersonalEvent, 'id' | 'createdAt'>) => void;
}

const COLOR_PRESETS = [
  { hex: '#dc2626', name: 'रातो (Red)' },
  { hex: '#ea580c', name: 'सुन्तला (Orange)' },
  { hex: '#d97706', name: 'पहेँलो/सुनौलो (Amber)' },
  { hex: '#16a34a', name: 'हरियो (Green)' },
  { hex: '#0284c7', name: 'आसमानी (Sky Blue)' },
  { hex: '#2563eb', name: 'नीलो (Blue)' },
  { hex: '#7c3aed', name: 'बैजनी (Purple)' },
  { hex: '#e11d48', name: 'गुलाबी (Rose)' },
];

export const AddEventModal: React.FC<AddEventModalProps> = ({
  initialDate,
  todayBs,
  todayAd,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [bsYear, setBsYear] = useState<number>(initialDate.year);
  const [bsMonth, setBsMonth] = useState<number>(initialDate.month);
  const [bsDay, setBsDay] = useState<number>(initialDate.day);
  const [color, setColor] = useState('#2563eb'); // default blue
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');

  // Validate day against selected month
  const maxDays = getDaysInBsMonth(bsYear, bsMonth);
  useEffect(() => {
    if (bsDay > maxDays) {
      setBsDay(maxDays);
    }
  }, [bsYear, bsMonth, maxDays, bsDay]);

  // Calculate corresponding AD date & countdown
  const adDate = bsToAd(bsYear, bsMonth, bsDay);
  const adFormatted = formatAdDate(adDate);
  const daysRemaining = calculateDaysRemaining(adDate, todayAd);
  const countdown = formatRemainingDays(daysRemaining);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('कृपया कार्यक्रमको नाम / शीर्षक लेख्नुहोस्');
      return;
    }

    onSave({
      title: title.trim(),
      bsYear,
      bsMonth,
      bsDay,
      color,
      notes: notes.trim() || undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-[#fffdfa] w-full max-w-md rounded-2xl border border-[#e5dacb] shadow-xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#e8dfd2] bg-[#f8f2e7] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#b91c1c] text-white flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-[#322319]">
                नयाँ व्यक्तिगत कार्यक्रम थप्नुहोस्
              </h2>
              <p className="text-[11px] text-[#7d695b]">
                Add Personal Event & Countdown
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#887465] hover:text-[#322319] hover:bg-[#ede3d4] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          
          {error && (
            <div className="p-2.5 rounded-lg bg-[#fde8e8] border border-[#f8b4b4] text-xs text-[#9b1c1c] font-medium">
              {error}
            </div>
          )}

          {/* Event Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4d3a2d] mb-1">
              कार्यक्रमको शीर्षक (Event Title) *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="जस्तै: आमाको जन्मदिन, अफिस बैठक, परीक्षा, योजना..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] placeholder-[#9c897a] text-sm focus:outline-none focus:ring-1 focus:ring-[#b91c1c] font-nepali"
              autoFocus
            />
          </div>

          {/* Nepali BS Date Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4d3a2d] mb-1">
              नेपाली मिति (Bikram Sambat Date)
            </label>
            <div className="grid grid-cols-3 gap-2">
              
              {/* Year */}
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

              {/* Month */}
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

              {/* Day */}
              <select
                value={bsDay}
                onChange={(e) => setBsDay(Number(e.target.value))}
                className="px-2.5 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm font-semibold focus:outline-none focus:ring-1 focus:ring-[#b91c1c]"
              >
                {Array.from({ length: maxDays }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d}>
                    {toDevanagari(d)} गते
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Color Selection - Notice to user that it fills the entire box! */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#4d3a2d] flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-[#b91c1c]" />
                कोठा भर्ने रङ्ग (Box Fill Color)
              </label>
              <span className="text-[10px] text-[#7d695b]">
                (यस रङ्गले क्यालेन्डरको पूरै कोठा भर्छ)
              </span>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.hex}
                  type="button"
                  onClick={() => setColor(preset.hex)}
                  title={preset.name}
                  className={`h-8 rounded-lg transition-transform flex items-center justify-center ${
                    color === preset.hex 
                      ? 'scale-110 ring-2 ring-offset-2 ring-[#342419]' 
                      : 'hover:scale-105 opacity-85 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: preset.hex }}
                >
                  {color === preset.hex && (
                    <span className="text-white text-xs font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview of Calendar Box & Countdown */}
          <div 
            style={{ backgroundColor: `${color}18`, borderColor: `${color}70` }}
            className="p-3.5 rounded-xl border-2 flex items-center justify-between transition-all"
          >
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#735e4e]">
                अंग्रेजी मिति (AD Equivalent):
              </span>
              <span className="text-xs sm:text-sm font-bold text-[#322319]">
                {adFormatted.fullStr}
              </span>
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#735e4e]">
                काउन्टडाउन:
              </span>
              <span 
                className="px-2 py-0.5 rounded-lg text-xs font-extrabold text-white shadow-2xs inline-block"
                style={{ backgroundColor: color }}
              >
                {countdown.textNe}
              </span>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#4d3a2d] mb-1 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5" />
              थप विवरण / नोट (Additional Notes - Optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="थप विवरण वा सम्झना गर्नुपर्ने कुराहरू..."
              className="w-full px-3 py-2 rounded-xl bg-[#fbf6ed] border border-[#dcd0bf] text-[#342419] text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-[#b91c1c] font-nepali resize-none"
            />
          </div>

          {/* Actions */}
          <div className="pt-2 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-[#d8cab7] text-[#554234] text-xs font-semibold hover:bg-[#efe6d8] transition-colors"
            >
              रद्द गर्नुहोस् (Cancel)
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-[#b91c1c] hover:bg-[#991b1b] text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
            >
              सुरक्षित गर्नुहोस् (Save Event)
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
