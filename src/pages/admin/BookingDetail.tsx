import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const sampleBookings = [
  { id: 1, dogName: 'Max', ownerName: 'Sarah M.', email: 'sarah@email.com', phone: '555-1234', checkIn: '2024-12-27', checkOut: '2024-12-30', service: 'Boarding', status: 'confirmed', notes: 'Needs medication twice daily' },
  { id: 2, dogName: 'Luna', ownerName: 'James T.', email: 'james@email.com', phone: '555-2345', checkIn: '2024-12-29', checkOut: '2025-01-02', service: 'Boarding', status: 'confirmed', notes: '' },
  { id: 3, dogName: 'Cooper', ownerName: 'Emily R.', email: 'emily@email.com', phone: '555-3456', checkIn: '2024-12-28', checkOut: '2025-01-05', service: 'Boarding', status: 'pending', notes: 'First time guest - Meet & Greet scheduled' },
  { id: 4, dogName: 'Bella', ownerName: 'Michael K.', email: 'michael@email.com', phone: '555-4567', checkIn: '2024-12-29', checkOut: '2024-12-31', service: 'Daycare', status: 'pending', notes: '' },
  { id: 5, dogName: 'Charlie', ownerName: 'Alex P.', email: 'alex@email.com', phone: '555-5678', checkIn: '2024-12-23', checkOut: '2024-12-28', service: 'Boarding', status: 'completed', notes: '' },
  { id: 6, dogName: 'Daisy', ownerName: 'Chris L.', email: 'chris@email.com', phone: '555-6789', checkIn: '2024-12-24', checkOut: '2024-12-27', service: 'Boarding', status: 'completed', notes: 'Allergic to chicken' },
  { id: 7, dogName: 'Rocky', ownerName: 'Pat M.', email: 'pat@email.com', phone: '555-7890', checkIn: '2024-12-25', checkOut: '2024-12-30', service: 'Boarding', status: 'confirmed', notes: '' },
  { id: 8, dogName: 'Coco', ownerName: 'Sam W.', email: 'sam@email.com', phone: '555-8901', checkIn: '2024-12-20', checkOut: '2024-12-22', service: 'Grooming', status: 'cancelled', notes: 'Rescheduled to January' },
];

export default function BookingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const bookingId = Number(id);
  const [booking, setBooking] = useState<any | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem('bookings');
      const saved = raw ? JSON.parse(raw) as any[] : [];
      const merged = [...saved, ...sampleBookings.filter(b => !saved.some(s => s.id === b.id))];
      const found = merged.find(b => b.id === bookingId) || null;
      setBooking(found);
    } catch (err) {
      const found = sampleBookings.find(b => b.id === bookingId) || null;
      setBooking(found);
    }
  }, [bookingId]);

  if (!booking) {
    return (
      <Layout>
        <section className="py-8 bg-background min-h-screen">
          <div className="container">
            <Card className="border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="font-display text-xl">Booking not found</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">We couldn't find that booking.</p>
                <div className="mt-4">
                  <Button onClick={() => navigate('/admin/bookings')}>Back to Bookings</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </Layout>
    );
  }

  const updateStatus = (newStatus: string) => {
    try {
      const raw = localStorage.getItem('bookings');
      const saved = raw ? JSON.parse(raw) as any[] : [];
      const existsIdx = saved.findIndex(s => s.id === booking.id);
      let updated: any[] = [];

      if (existsIdx > -1) {
        updated = saved.map(s => s.id === booking.id ? { ...s, status: newStatus } : s);
      } else {
        // add booking to saved with updated status
        const toSave = { ...booking, status: newStatus };
        updated = [toSave, ...saved];
      }

      localStorage.setItem('bookings', JSON.stringify(updated));
      setBooking((b: any) => ({ ...b, status: newStatus }));
      toast({ title: 'Booking updated', description: `Status changed to ${newStatus}` });
    } catch (err) {
      toast({ title: 'Error', description: 'Could not update booking status.' });
    }
  };

  return (
    <Layout>
      <section className="py-8 bg-background min-h-screen">
        <div className="container">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl">Booking: {booking.dogName}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Owner</p>
                  <p className="font-medium text-foreground">{booking.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium text-foreground">{booking.service}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Check-in</p>
                    <p className="font-medium text-foreground">{booking.checkIn}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Check-out</p>
                    <p className="font-medium text-foreground">{booking.checkOut}</p>
                  </div>
                </div>
                {booking.notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Notes</p>
                    <p className="font-medium text-foreground">{booking.notes}</p>
                  </div>
                )}

                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-medium text-foreground">{booking.status}</p>
                </div>

                <div className="flex gap-2 justify-end">
                  {booking.status !== 'confirmed' && (
                    <Button onClick={() => updateStatus('confirmed')}>Confirm</Button>
                  )}
                  {booking.status !== 'completed' && (
                    <Button onClick={() => updateStatus('completed')}>Mark Complete</Button>
                  )}
                  {booking.status !== 'cancelled' && (
                    <Button variant="destructive" onClick={() => updateStatus('cancelled')}>Cancel</Button>
                  )}
                  <Button onClick={() => navigate('/admin/bookings')}>Back</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}

