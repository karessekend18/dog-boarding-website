import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Dog } from 'lucide-react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// Sample bookings data
const bookings: Record<string, { dogName: string; ownerName: string; type: 'start' | 'end' | 'ongoing' }[]> = {
  '2024-12-23': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'start' }],
  '2024-12-24': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'ongoing' }, { dogName: 'Daisy', ownerName: 'Chris L.', type: 'start' }],
  '2024-12-25': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'ongoing' }, { dogName: 'Daisy', ownerName: 'Chris L.', type: 'ongoing' }, { dogName: 'Rocky', ownerName: 'Pat M.', type: 'start' }],
  '2024-12-26': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'ongoing' }, { dogName: 'Daisy', ownerName: 'Chris L.', type: 'ongoing' }, { dogName: 'Rocky', ownerName: 'Pat M.', type: 'ongoing' }],
  '2024-12-27': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'ongoing' }, { dogName: 'Daisy', ownerName: 'Chris L.', type: 'end' }, { dogName: 'Rocky', ownerName: 'Pat M.', type: 'ongoing' }, { dogName: 'Max', ownerName: 'Sarah M.', type: 'start' }],
  '2024-12-28': [{ dogName: 'Charlie', ownerName: 'Alex P.', type: 'end' }, { dogName: 'Rocky', ownerName: 'Pat M.', type: 'ongoing' }, { dogName: 'Max', ownerName: 'Sarah M.', type: 'ongoing' }],
  '2024-12-29': [{ dogName: 'Rocky', ownerName: 'Pat M.', type: 'ongoing' }, { dogName: 'Max', ownerName: 'Sarah M.', type: 'ongoing' }, { dogName: 'Luna', ownerName: 'James T.', type: 'start' }],
  '2024-12-30': [{ dogName: 'Rocky', ownerName: 'Pat M.', type: 'end' }, { dogName: 'Max', ownerName: 'Sarah M.', type: 'end' }, { dogName: 'Luna', ownerName: 'James T.', type: 'ongoing' }],
};

export default function AdminCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2024, 11, 1)); // December 2024

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const paddingDays = Array.from({ length: firstDay }, (_, i) => null);

  const getDateKey = (day: number) => {
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    return `${currentDate.getFullYear()}-${month}-${dayStr}`;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return today.getDate() === day && today.getMonth() === currentDate.getMonth() && today.getFullYear() === currentDate.getFullYear();
  };

  return (
    <Layout>
      <section className="py-8 bg-background min-h-screen">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Booking Calendar</h1>
              <p className="text-muted-foreground">View and manage all your bookings at a glance.</p>
            </div>
          </div>

          <Card className="border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <CardTitle className="font-display text-2xl">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </CardTitle>
              <Button variant="ghost" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent>
              {/* Days of Week Header */}
              <div className="grid grid-cols-7 gap-2 mb-4">
                {daysOfWeek.map((day) => (
                  <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-2">
                {paddingDays.map((_, index) => (
                  <div key={`pad-${index}`} className="aspect-square" />
                ))}
                {days.map((day) => {
                  const dateKey = getDateKey(day);
                  const dayBookings = bookings[dateKey] || [];
                  
                  return (
                    <div
                      key={day}
                      className={`aspect-square p-1 rounded-xl border transition-all hover:shadow-soft cursor-pointer ${
                        isToday(day) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex flex-col h-full">
                        <span className={`text-sm font-medium ${isToday(day) ? 'text-primary' : 'text-foreground'}`}>
                          {day}
                        </span>
                        <div className="flex-1 overflow-hidden space-y-0.5 mt-1">
                          {dayBookings.slice(0, 3).map((booking, idx) => (
                            <div
                              key={idx}
                              className={`text-[10px] px-1 py-0.5 rounded truncate ${
                                booking.type === 'start' ? 'bg-primary text-primary-foreground' :
                                booking.type === 'end' ? 'bg-accent text-accent-foreground' :
                                'bg-secondary text-secondary-foreground'
                              }`}
                            >
                              {booking.dogName}
                            </div>
                          ))}
                          {dayBookings.length > 3 && (
                            <div className="text-[10px] text-muted-foreground text-center">
                              +{dayBookings.length - 3} more
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-primary" />
                  <span className="text-sm text-muted-foreground">Check-in</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-secondary" />
                  <span className="text-sm text-muted-foreground">Ongoing Stay</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded bg-accent" />
                  <span className="text-sm text-muted-foreground">Check-out</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Activity */}
          <Card className="border-0 shadow-soft mt-8">
            <CardHeader>
              <CardTitle className="font-display text-xl flex items-center gap-2">
                <Dog className="h-5 w-5 text-primary" />
                Today's Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h4 className="font-semibold text-primary mb-2">Arrivals</h4>
                  <p className="text-2xl font-display font-bold text-foreground">2</p>
                  <p className="text-sm text-muted-foreground">Max, Luna</p>
                </div>
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <h4 className="font-semibold text-accent mb-2">Departures</h4>
                  <p className="text-2xl font-display font-bold text-foreground">1</p>
                  <p className="text-sm text-muted-foreground">Daisy</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary border border-border">
                  <h4 className="font-semibold text-foreground mb-2">Currently Staying</h4>
                  <p className="text-2xl font-display font-bold text-foreground">5</p>
                  <p className="text-sm text-muted-foreground">Charlie, Rocky, +3</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
