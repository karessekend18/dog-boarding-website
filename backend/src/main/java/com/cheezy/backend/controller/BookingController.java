package com.cheezy.backend.controller;

import com.cheezy.backend.model.Booking;
import com.cheezy.backend.repository.BookingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // Create a new booking
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        booking.setStatus("PENDING");
        return bookingRepository.save(booking);
    }

    // Get all bookings (admin)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
