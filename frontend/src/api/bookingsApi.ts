const API_BASE_URL = 'http://localhost:8080/api/admin';

export async function fetchBookings() {
  const response = await fetch(`${API_BASE_URL}/bookings`);

  if (!response.ok) {
    throw new Error('Failed to fetch bookings');
  }

  return response.json();
}
