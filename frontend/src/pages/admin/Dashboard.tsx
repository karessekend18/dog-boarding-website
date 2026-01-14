import { useEffect, useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  Dog,
  Users,
  Star,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API}/api/admin/dashboard`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("hp_token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          localStorage.removeItem("hp_token");
          navigate("/admin/login");
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then(setStats)
      .catch(() => console.error("Failed to load dashboard"));
  }, []);

  const statCards = stats
    ? [
        {
          label: "Active Bookings",
          value: stats.activeBookings,
          icon: Calendar,
          trend: "Live",
        },
        {
          label: "Dogs in Care",
          value: stats.dogsInCare,
          icon: Dog,
          trend: "Currently boarded",
        },
        {
          label: "Total Clients",
          value: stats.totalClients,
          icon: Users,
          trend: "All time",
        },
        {
          label: "Avg. Rating",
          value: stats.avgRating,
          icon: Star,
          trend: "Reviews",
        },
      ]
    : [];

  const upcomingBookings = stats?.upcomingBookings || [];
  const currentGuests = stats?.currentGuests || [];

  return (
    <Layout>
      <section className="py-8 bg-background">
        <div className="container">
          <h1 className="font-display text-3xl font-bold mb-6">
            Admin Dashboard
          </h1>

          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <Card key={stat.label}>
                <CardContent className="p-6">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-xs text-primary flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {stat.trend}
                      </p>
                    </div>
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upcoming Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingBookings.map((b: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{b.dogName}</span>
                    <span>{b.status}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Current Guests */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Current Guests ({currentGuests.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentGuests.map((g: any, i: number) => (
                  <div key={i} className="flex justify-between">
                    <span>{g.dogName}</span>
                    <span>{g.breed}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button asChild variant="outline">
                <Link to="/admin/create-booking">New Booking</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/register-dog">Add Dog</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/admin/clients">Clients</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/feedback">Reviews</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
