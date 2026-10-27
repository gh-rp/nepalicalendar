import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { CalendarMonthNav } from './components/CalendarMonthNav';
import { CalendarGrid } from './components/CalendarGrid';
import { SidebarWidgets } from './components/SidebarWidgets';
import { PersonalEventsSection } from './components/PersonalEventsSection';
import { DayDetailModal } from './components/DayDetailModal';
import { AddEventModal } from './components/AddEventModal';
import { DateConverterModal } from './components/DateConverterModal';
import { BSDate, PersonalEvent } from './types';
import { 
  adToBs, 
  toDevanagari, 
  MIN_BS_YEAR, 
  MAX_BS_YEAR 
} from './utils/nepaliCalendar';
import { 
  getStoredPersonalEvents, 
  addPersonalEvent, 
  deletePersonalEvent 
} from './utils/personalEventsStorage';

export default function App() {

  // Real today date
  const todayAd = useMemo(() => new Date(), []);
  const todayBs = useMemo(() => adToBs(todayAd), [todayAd]);

  // Current viewed month and year
  const [currentBsDate, setCurrentBsDate] = useState<BSDate>(() => ({
    year: todayBs.year,
    month: todayBs.month,
    day: todayBs.day,
  }));

  // Selected date for day detail modal
  const [selectedDate, setSelectedDate] = useState<BSDate | null>(null);

  // Stored personal events
  const [personalEvents, setPersonalEvents] = useState<PersonalEvent[]>(() =>
    getStoredPersonalEvents()
  );

  // Modals state
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [addEventDate, setAddEventDate] = useState<BSDate>(todayBs);
  const [isConverterOpen, setIsConverterOpen] = useState(false);

  // Navigation handlers
  const handleYearChange = (newYear: number) => {
    setCurrentBsDate((prev) => ({ ...prev, year: newYear }));
  };

  const handleMonthChange = (newMonth: number) => {
    setCurrentBsDate((prev) => ({ ...prev, month: newMonth }));
  };

  const handlePrevMonth = () => {
    setCurrentBsDate((prev) => {
      if (prev.month === 1) {
        const nextYear = Math.max(MIN_BS_YEAR, prev.year - 1);
        return { year: nextYear, month: 12, day: 1 };
      }
      return { ...prev, month: prev.month - 1, day: 1 };
    });
  };

  const handleNextMonth = () => {
    setCurrentBsDate((prev) => {
      if (prev.month === 12) {
        const nextYear = Math.min(MAX_BS_YEAR, prev.year + 1);
        return { year: nextYear, month: 1, day: 1 };
      }
      return { ...prev, month: prev.month + 1, day: 1 };
    });
  };

  const handleGoToToday = () => {
    setCurrentBsDate({
      year: todayBs.year,
      month: todayBs.month,
      day: todayBs.day,
    });
    setSelectedDate({
      year: todayBs.year,
      month: todayBs.month,
      day: todayBs.day,
    });
  };

  const handleOpenAddEventWithDate = (date?: BSDate) => {
    setAddEventDate(date || currentBsDate);
    setIsAddEventOpen(true);
  };

  const handleSavePersonalEvent = (eventData: Omit<PersonalEvent, 'id' | 'createdAt'>) => {
    const saved = addPersonalEvent(eventData);
    setPersonalEvents((prev) => [saved, ...prev]);
  };

  const handleDeletePersonalEvent = (id: string) => {
    const updated = deletePersonalEvent(id);
    setPersonalEvents(updated);
  };

  const handleNavigateToDate = (targetDate: BSDate) => {
    setCurrentBsDate({
      year: targetDate.year,
      month: targetDate.month,
      day: targetDate.day,
    });
    setSelectedDate(targetDate);
  };

  return (
    <div className="min-h-screen bg-[#f6f1e8] text-[#3c2f25] flex flex-col font-sans selection:bg-[#d9534f] selection:text-white">
      
      {/* Sleek, Compact Sepia Header */}
      <Header
        currentBsDate={currentBsDate}
        todayBs={todayBs}
        todayAd={todayAd}
        onGoToToday={handleGoToToday}
        onOpenAddEvent={() => handleOpenAddEventWithDate(currentBsDate)}
        onOpenConverter={() => setIsConverterOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 py-3.5 sm:py-4">
        
        {/* Compact Month Navigation */}
        <CalendarMonthNav
          currentBsDate={currentBsDate}
          onYearChange={handleYearChange}
          onMonthChange={handleMonthChange}
          onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
        />

        {/* Calendar and Sidebar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3.5 sm:gap-4 items-start">
          
          {/* Main 7x5 Calendar Grid */}
          <div className="lg:col-span-3">
            <CalendarGrid
              currentBsDate={currentBsDate}
              todayBs={todayBs}
              todayAd={todayAd}
              personalEvents={personalEvents}
              selectedDate={selectedDate}
              onSelectDate={(d) => setSelectedDate(d)}
            />

            {/* Upcoming Events Section right below calendar */}
            <PersonalEventsSection
              personalEvents={personalEvents}
              todayBs={todayBs}
              todayAd={todayAd}
              onOpenAddEvent={() => handleOpenAddEventWithDate(currentBsDate)}
              onDeleteEvent={handleDeletePersonalEvent}
              onSelectDate={handleNavigateToDate}
            />
          </div>

          {/* Sidebar (This Month's Festivals) */}
          <div className="lg:col-span-1">
            <SidebarWidgets
              currentBsDate={currentBsDate}
              todayBs={todayBs}
              todayAd={todayAd}
              onSelectDate={handleNavigateToDate}
            />
          </div>

        </div>

      </main>

      {/* Modals */}
      {selectedDate && (
        <DayDetailModal
          date={selectedDate}
          todayBs={todayBs}
          todayAd={todayAd}
          personalEvents={personalEvents}
          onClose={() => setSelectedDate(null)}
          onAddEventForDate={(d) => {
            setSelectedDate(null);
            handleOpenAddEventWithDate(d);
          }}
          onDeletePersonalEvent={handleDeletePersonalEvent}
        />
      )}

      {isAddEventOpen && (
        <AddEventModal
          initialDate={addEventDate}
          todayBs={todayBs}
          todayAd={todayAd}
          onClose={() => setIsAddEventOpen(false)}
          onSave={handleSavePersonalEvent}
        />
      )}

      {isConverterOpen && (
        <DateConverterModal
          onClose={() => setIsConverterOpen(false)}
          onNavigateToDate={handleNavigateToDate}
        />
      )}



      {/* Sepia Footer */}
      <footer className="mt-8 border-t border-[#e5dacb] bg-[#fffdfa]/80 py-3.5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#7d695b]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#342419] font-serif">
              पात्रो
            </span>
            <span>•</span>
            <span>सटीक तिथि, सार्वजनिक बिदा र व्यक्तिगत कार्यक्रम काउन्टडाउन</span>
          </div>
          <div>
            वि.सं. {toDevanagari(MIN_BS_YEAR)} – {toDevanagari(MAX_BS_YEAR)}
          </div>
        </div>
      </footer>

    </div>
  );
}
