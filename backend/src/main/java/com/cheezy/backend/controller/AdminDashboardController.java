package com.cheezy.backend.controller;

import com.cheezy.backend.DTO.DashboardStats;
import com.cheezy.backend.DTO.DashboardStatsResponse;
import com.cheezy.backend.repository.BookingRepository;
import com.cheezy.backend.repository.DogRepository;
import com.cheezy.backend.repository.ReviewRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final BookingRepository bookingRepo;
//    private final DogRepository dogRepo;
//    private final ClientRepository clientRepo;
//    private final ReviewRepository reviewRepo;

    public AdminDashboardController(
            BookingRepository bookingRepo
    ) {
        this.bookingRepo = bookingRepo;

    }

    @GetMapping
    public DashboardStatsResponse getDashboardStats() {
        long activeBookings = bookingRepo.countByStatus("CONFIRMED");
        long dogsInCare = bookingRepo.countByStatus("CONFIRMED");


        return new DashboardStatsResponse(
                activeBookings,
                dogsInCare,0,0

        );
    }
}

