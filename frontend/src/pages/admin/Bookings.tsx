import { useEffect, useState } from 'react';
import { fetchBookings } from '@/api/bookingsApi';

interface Booking {
  id: string;
  ownerName: string;
  dogName: string;
  serviceType: string;
  status: string;
  startDate: string;
  endDate: string;
}

export default function Bookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBookings() {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (err) {
        setError('Unable to load bookings');
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  if (loading) {
    return <p>Loading bookings...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (bookings.length === 0) {
    return <p>No bookings found</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bookings</h1>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Owner</th>
            <th>Dog</th>
            <th>Service</th>
            <th>Status</th>
            <th>Dates</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b">
              <td>{booking.ownerName}</td>
              <td>{booking.dogName}</td>
              <td>{booking.serviceType}</td>
              <td>{booking.status}</td>
              <td>
                {booking.startDate} → {booking.endDate}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
