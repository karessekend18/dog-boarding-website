import { useState, useEffect } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Check, X, Eye, Calendar, Dog } from 'lucide-react';
import { Link } from 'react-router-dom';
import BookingModal from '@/components/BookingModal';

type BookingStatus = 'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled';

const allBookings = [
	{
		id: 1,
		dogName: 'Max',
		ownerName: 'Sarah M.',
		email: 'sarah@email.com',
		phone: '555-1234',
		checkIn: '2024-12-27',
		checkOut: '2024-12-30',
		service: 'Boarding',
		status: 'confirmed',
		notes: 'Needs medication twice daily',
	},
	{
		id: 2,
		dogName: 'Luna',
		ownerName: 'James T.',
		email: 'james@email.com',
		phone: '555-2345',
		checkIn: '2024-12-29',
		checkOut: '2025-01-02',
		service: 'Boarding',
		status: 'confirmed',
		notes: '',
	},
	{
		id: 3,
		dogName: 'Cooper',
		ownerName: 'Emily R.',
		email: 'emily@email.com',
		phone: '555-3456',
		checkIn: '2024-12-28',
		checkOut: '2025-01-05',
		service: 'Boarding',
		status: 'pending',
		notes: 'First time guest - Meet & Greet scheduled',
	},
	{
		id: 4,
		dogName: 'Bella',
		ownerName: 'Michael K.',
		email: 'michael@email.com',
		phone: '555-4567',
		checkIn: '2024-12-29',
		checkOut: '2024-12-31',
		service: 'Daycare',
		status: 'pending',
		notes: '',
	},
	{
		id: 5,
		dogName: 'Charlie',
		ownerName: 'Alex P.',
		email: 'alex@email.com',
		phone: '555-5678',
		checkIn: '2024-12-23',
		checkOut: '2024-12-28',
		service: 'Boarding',
		status: 'completed',
		notes: '',
	},
	{
		id: 6,
		dogName: 'Daisy',
		ownerName: 'Chris L.',
		email: 'chris@email.com',
		phone: '555-6789',
		checkIn: '2024-12-24',
		checkOut: '2024-12-27',
		service: 'Boarding',
		status: 'completed',
		notes: 'Allergic to chicken',
	},
	{
		id: 7,
		dogName: 'Rocky',
		ownerName: 'Pat M.',
		email: 'pat@email.com',
		phone: '555-7890',
		checkIn: '2024-12-25',
		checkOut: '2024-12-30',
		service: 'Boarding',
		status: 'confirmed',
		notes: '',
	},
	{
		id: 8,
		dogName: 'Coco',
		ownerName: 'Sam W.',
		email: 'sam@email.com',
		phone: '555-8901',
		checkIn: '2024-12-20',
		checkOut: '2024-12-22',
		service: 'Grooming',
		status: 'cancelled',
		notes: 'Rescheduled to January',
	},
];

export default function AdminBookings() {
	const [search, setSearch] = useState('');
	const [statusFilter, setStatusFilter] = useState<BookingStatus>('all');
	const [bookings, setBookings] = useState(allBookings);
	const [modalOpen, setModalOpen] = useState(false);
	const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

	useEffect(() => {
		try {
			const raw = localStorage.getItem('bookings');
			const saved = raw ? JSON.parse(raw) : [];
			// Merge saved with sample, preferring saved entries (they're newest first)
			const merged = [
				...saved,
				...allBookings.filter((b) => !saved.some((s) => s.id === b.id)),
			];
			setBookings(merged);
		} catch (err) {
			setBookings(allBookings);
		}
	}, []);

	const openBooking = (b: any) => {
		setSelectedBooking(b);
		setModalOpen(true);
	};

	const filteredBookings = bookings.filter((booking) => {
		const matchesSearch =
			booking.dogName.toLowerCase().includes(search.toLowerCase()) ||
			booking.ownerName.toLowerCase().includes(search.toLowerCase());
		const matchesStatus =
			statusFilter === 'all' || booking.status === statusFilter;
		return matchesSearch && matchesStatus;
	});

	const getStatusColor = (status: string) => {
		switch (status) {
			case 'confirmed':
				return 'bg-primary/20 text-primary';
			case 'pending':
				return 'bg-accent/20 text-accent';
			case 'completed':
				return 'bg-forest-light/20 text-forest';
			case 'cancelled':
				return 'bg-destructive/20 text-destructive';
			default:
				return 'bg-muted text-muted-foreground';
		}
	};

	return (
		<Layout>
			<section className="py-8 bg-background min-h-screen">
				<div className="container">
					<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
						<div>
							<h1 className="font-display text-3xl font-bold text-foreground">
								Bookings
							</h1>
							<p className="text-muted-foreground">
								Manage all your bookings and reservations.
							</p>
						</div>
						<Button asChild>
							<Link to="/admin/create-booking">
								<Calendar className="h-4 w-4 mr-2" />
								New Booking
							</Link>
						</Button>
					</div>

					{/* Filters */}
					<Card className="border-0 shadow-soft mb-6">
						<CardContent className="p-4">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="relative flex-1">
									<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
									<Input
										placeholder="Search by dog or owner name..."
										value={search}
										onChange={(e) => setSearch(e.target.value)}
										className="pl-10"
									/>
								</div>
								<div className="flex gap-2 flex-wrap">
									{(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as BookingStatus[]).map(
										(status) => (
											<Button
												key={status}
												variant={
													statusFilter === status
														? 'default'
														: 'outline'
												}
												size="sm"
												onClick={() => setStatusFilter(status)}
												className="capitalize"
											>
												{status}
											</Button>
										)
									)}
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Bookings Table */}
					<Card className="border-0 shadow-soft overflow-hidden">
						<CardContent className="p-0">
							<div className="overflow-x-auto">
								<table className="w-full">
									<thead className="bg-secondary/50">
										<tr>
											<th className="text-left p-4 font-semibold text-foreground">
												Dog
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Owner
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Service
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Check-in
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Check-out
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Status
											</th>
											<th className="text-left p-4 font-semibold text-foreground">
												Actions
											</th>
										</tr>
									</thead>
									<tbody className="divide-y divide-border">
										{filteredBookings.map((booking) => (
											<tr
												key={booking.id}
												className="hover:bg-secondary/30 transition-colors"
											>
												<td className="p-4">
													<div className="flex items-center gap-3">
														<div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
															{booking.dogName[0]}
														</div>
														<div>
															<p className="font-semibold text-foreground">
																{booking.dogName}
															</p>
															{booking.notes && (
																<p className="text-xs text-muted-foreground truncate max-w-[150px]">
																	{booking.notes}
																</p>
															)}
														</div>
													</div>
												</td>
												<td className="p-4">
													<p className="text-foreground">
														{booking.ownerName}
													</p>
													<p className="text-xs text-muted-foreground">
														{booking.phone}
													</p>
												</td>
												<td className="p-4 text-foreground">
													{booking.service}
												</td>
												<td className="p-4 text-foreground">
													{booking.checkIn}
												</td>
												<td className="p-4 text-foreground">
													{booking.checkOut}
												</td>
												<td className="p-4">
													<span
														className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(
															booking.status
														)}`}
													>
														{booking.status}
													</span>
												</td>
												<td className="p-4">
													<div className="flex gap-2">
														<Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openBooking(booking)}>
															<Eye className="h-4 w-4" />
														</Button>
														{booking.status === 'pending' && (
															<>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8 text-primary hover:text-primary"
																>
																	<Check className="h-4 w-4" />
																</Button>
																<Button
																	variant="ghost"
																	size="icon"
																	className="h-8 w-8 text-destructive hover:text-destructive"
																>
																	<X className="h-4 w-4" />
																</Button>
															</>
														)}
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{filteredBookings.length === 0 && (
								<div className="text-center py-12">
									<Dog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
									<p className="text-muted-foreground">
										No bookings found matching your criteria.
									</p>
								</div>
							)}
						</CardContent>
					</Card>

					<BookingModal booking={selectedBooking} open={modalOpen} onOpenChange={(open) => setModalOpen(open)} onUpdated={() => {
        // refresh bookings after update
        try {
          const raw = localStorage.getItem('bookings');
          const saved = raw ? JSON.parse(raw) : [];
          const merged = [
            ...saved,
            ...allBookings.filter((b) => !saved.some((s) => s.id === b.id)),
          ];
          setBookings(merged);
        } catch (err) {
          setBookings(allBookings);
        }
      }} />
				</div>
			</section>
		</Layout>
	);
}
