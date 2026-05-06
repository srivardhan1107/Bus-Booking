package com.spring.bms.controller;



import com.spring.bms.dto.BookingDto;
import com.spring.bms.service.BookingService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    @PostMapping
    public ResponseEntity<BookingDto> createBooking(@RequestBody BookingDto bookingDto) {

        BookingDto savedBooking = bookingService.saveBooking(bookingDto);

        return new ResponseEntity<>(savedBooking, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<BookingDto> getBookingById(@PathVariable Long id) {

        BookingDto bookingDto = bookingService.getBookingById(id);

        return ResponseEntity.ok(bookingDto);
    }


    @GetMapping
    public ResponseEntity<List<BookingDto>> getAllBookings() {

        List<BookingDto> bookings = bookingService.getAllBookings();

        return ResponseEntity.ok(bookings);
    }


    @PutMapping("/{id}")
    public ResponseEntity<BookingDto> updateBooking(
            @PathVariable Long id,
            @RequestBody BookingDto bookingDto) {

        BookingDto updatedBooking = bookingService.updateBooking(id, bookingDto);

        return ResponseEntity.ok(updatedBooking);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBooking(@PathVariable Long id) {

        bookingService.deleteBooking(id);

        return ResponseEntity.ok("Booking Deleted Successfully");
    }
}