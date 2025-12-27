import * as React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Booking {
  id: number;
  dogName: string;
  ownerName: string;
  email?: string;
  phone?: string;
  checkIn?: string;
  checkOut?: string;
  service?: string;
  status?: string;
  notes?: string;
}

interface Props {
  booking: Booking | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdated?: () => void;
}

export default function BookingModal({ booking, open, onOpenChange, onUpdated }: Props) {
  const { toast } = useToast();

  const updateStatus = React.useCallback(
    (newStatus: string) => {
      if (!booking) return;
      try {
        const raw = localStorage.getItem('bookings');
        const saved = raw ? JSON.parse(raw) as Booking[] : [];
        const existsIdx = saved.findIndex(s => s.id === booking.id);
        let updated: Booking[] = [];

        if (existsIdx > -1) {
          updated = saved.map(s => (s.id === booking.id ? { ...s, status: newStatus } : s));
        } else {
          const toSave = { ...booking, status: newStatus };
          updated = [toSave, ...saved];
        }

        localStorage.setItem('bookings', JSON.stringify(updated));
        toast({ title: 'Booking updated', description: `Status changed to ${newStatus}` });
        if (onUpdated) onUpdated();
        onOpenChange(false);
      } catch (err) {
        toast({ title: 'Error', description: 'Could not update booking status.' });
      }
    },
    [booking, onOpenChange, onUpdated, toast]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{booking ? `Booking: ${booking.dogName}` : 'Booking'}</DialogTitle>
          <DialogDescription>{booking ? `${booking.ownerName} — ${booking.service}` : ''}</DialogDescription>
        </DialogHeader>

        <Card className="border-0 shadow-none">
          <CardContent>
            {!booking ? (
              <p className="text-muted-foreground">No booking selected.</p>
            ) : (
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
                  <Button onClick={() => onOpenChange(false)}>Close</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}

