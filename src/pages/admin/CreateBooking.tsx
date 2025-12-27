import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function CreateBooking() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [form, setForm] = useState({
    dogName: '',
    ownerName: '',
    checkIn: '',
    checkOut: '',
    service: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const raw = localStorage.getItem('bookings');
      const existing = raw ? JSON.parse(raw) as any[] : [];
      const newBooking = {
        id: Date.now(),
        dogName: form.dogName,
        ownerName: form.ownerName,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        service: form.service,
        status: 'pending',
        notes: form.notes,
        phone: '',
        email: '',
      };
      existing.unshift(newBooking);
      localStorage.setItem('bookings', JSON.stringify(existing));

      toast({
        title: 'Booking created',
        description: `Booking for ${form.dogName} was created.`,
      });

      navigate('/admin/bookings');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Could not save booking locally.',
      });
    }
  };

  return (
    <Layout>
      <section className="py-8 bg-background min-h-screen">
        <div className="container">
          <Card className="border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="font-display text-xl">Create Booking</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Dog name</label>
                  <Input name="dogName" value={form.dogName} onChange={handleChange} required />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Owner name</label>
                  <Input name="ownerName" value={form.ownerName} onChange={handleChange} required />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Check-in</label>
                  <Input name="checkIn" type="date" value={form.checkIn} onChange={handleChange} required />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-1 block">Check-out</label>
                  <Input name="checkOut" type="date" value={form.checkOut} onChange={handleChange} required />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">Service</label>
                  <Input name="service" value={form.service} onChange={handleChange} placeholder="Boarding, Daycare, Grooming..." />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm text-muted-foreground mb-1 block">Notes</label>
                  <Textarea name="notes" value={form.notes} onChange={handleChange} rows={4} />
                </div>

                <div className="sm:col-span-2 flex justify-end">
                  <Button type="submit">Create Booking</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
