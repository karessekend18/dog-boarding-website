package com.cheezy.backend.repository;

import com.cheezy.backend.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDate;

public interface BookingRepository extends MongoRepository<Booking, String> {
    long countByStartDateAfter(LocalDate now);

    long countByStatus(String status);


}
