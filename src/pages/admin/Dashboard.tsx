import { Layout } from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Calendar, Dog, Users, Star, Clock, ArrowRight, TrendingUp, Check, X } from 'lucide-react';

const stats = [
  { label: 'Active Bookings', value: '12', icon: Calendar, trend: '+3 this week' },
  { label: 'Dogs in Care', value: '8', icon: Dog, trend: '2 arriving today' },
  { label: 'Total Clients', value: '156', icon: Users, trend: '+5 this month' },
  { label: 'Avg. Rating', value: '4.9', icon: Star, trend: 'From 89 reviews' },
];

const upcomingBookings = [
  { dogName: 'Max', ownerName: 'Sarah M.', checkIn: 'Today, 10:00 AM', checkOut: 'Dec 30', status: 'arriving' },
  { dogName: 'Luna', ownerName: 'James T.', checkIn: 'Today, 2:00 PM', checkOut: 'Jan 2', status: 'arriving' },
  { dogName: 'Cooper', ownerName: 'Emily R.', checkIn: 'Dec 28', checkOut: 'Jan 5', status: 'confirmed' },
  { dogName: 'Bella', ownerName: 'Michael K.', checkIn: 'Dec 29', checkOut: 'Dec 31', status: 'pending' },
];

const currentGuests = [
  { dogName: 'Charlie', breed: 'Labrador', owner: 'Alex P.', since: 'Dec 23', until: 'Dec 28' },
  { dogName: 'Daisy', breed: 'Beagle', owner: 'Chris L.', since: 'Dec 24', until: 'Dec 27' },
  { dogName: 'Rocky', breed: 'German Shepherd', owner: 'Pat M.', since: 'Dec 25', until: 'Dec 30' },
];

export default function AdminDashboard() {
  return (
    <Layout>
      <section className="py-8 bg-background">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's your overview.</p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <Link to="/admin/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Calendar
                </Link>
              </Button>
              <Button asChild>
                <Link to="/admin/bookings">
                  View All Bookings
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={stat.label} className="border-0 shadow-soft animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="font-display text-3xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-primary mt-1 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {stat.trend}
                      </p>
                    </div>
                    <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Bookings */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Upcoming Bookings</CardTitle>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/bookings">View All</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingBookings.map((booking, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold">
                          {booking.dogName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{booking.dogName}</p>
                          <p className="text-sm text-muted-foreground">{booking.ownerName}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{booking.checkIn}</p>
                        <p className="text-xs text-muted-foreground">Until {booking.checkOut}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === 'arriving' ? 'bg-accent/20 text-accent' :
                        booking.status === 'confirmed' ? 'bg-primary/20 text-primary' :
                        'bg-muted text-muted-foreground'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Guests */}
            <Card className="border-0 shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-display text-xl">Current Guests</CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {currentGuests.length} dogs in care
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentGuests.map((guest, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-display font-bold">
                          {guest.dogName[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{guest.dogName}</p>
                          <p className="text-sm text-muted-foreground">{guest.breed}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{guest.owner}</p>
                        <p className="text-xs text-muted-foreground">{guest.since} - {guest.until}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-0 shadow-soft mt-8">
            <CardHeader>
              <CardTitle className="font-display text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>New Booking</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Dog className="h-5 w-5" />
                  <span>Add New Dog</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Users className="h-5 w-5" />
                  <span>View Clients</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Star className="h-5 w-5" />
                  <span>View Reviews</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
