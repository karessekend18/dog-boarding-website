package com.cheezy.backend.DTO;


public class DashboardStats {
    private long totalBookings;
    private long upcomingBookings;
    private long activeDogs;
    private long recentReviews;

    // getters + setters

    public long getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(long totalBookings) {
        this.totalBookings = totalBookings;
    }

    public long getUpcomingBookings() {
        return upcomingBookings;
    }

    public void setUpcomingBookings(long upcomingBookings) {
        this.upcomingBookings = upcomingBookings;
    }

    public long getActiveDogs() {
        return activeDogs;
    }

    public void setActiveDogs(long activeDogs) {
        this.activeDogs = activeDogs;
    }

    public long getRecentReviews() {
        return recentReviews;
    }

    public void setRecentReviews(long recentReviews) {
        this.recentReviews = recentReviews;
    }
}

