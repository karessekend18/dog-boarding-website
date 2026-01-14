package com.cheezy.backend.DTO;

public record DashboardStatsResponse(
        long activeBookings,
        long dogsInCare,
        long totalClients,
        double avgRating
) {}
