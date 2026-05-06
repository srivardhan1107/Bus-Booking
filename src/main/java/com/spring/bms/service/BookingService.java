package com.spring.bms.service;

import com.spring.bms.dto.BookingDto;
import com.spring.bms.entity.Booking;
import com.spring.bms.entity.Bus;
import com.spring.bms.entity.User;
import com.spring.bms.mapper.BookingMapper;
import com.spring.bms.repository.BookingRepository;
import com.spring.bms.repository.BusRepository;
import com.spring.bms.repository.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final BusRepository busRepository;

    // Create
    public BookingDto saveBooking(BookingDto bookingDto) {

        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(bookingDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Booking booking = BookingMapper.toEntity(bookingDto);

        booking.setUser(user);
        booking.setBus(bus);

        Booking savedBooking = bookingRepository.save(booking);

        return BookingMapper.toDTO(savedBooking);
    }

    // Get by Id
    public BookingDto getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        return BookingMapper.toDTO(booking);
    }

    // Get all
    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(BookingMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update
    public BookingDto updateBooking(Long id, BookingDto bookingDto) {

        Booking existingBooking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        User user = userRepository.findById(bookingDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Bus bus = busRepository.findById(bookingDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        existingBooking.setUser(user);
        existingBooking.setBus(bus);
        existingBooking.setSeatNumber(bookingDto.getSeatNumber());
        existingBooking.setBookingDate(bookingDto.getBookingDate());
        existingBooking.setStatus(bookingDto.getStatus());

        Booking updatedBooking = bookingRepository.save(existingBooking);

        return BookingMapper.toDTO(updatedBooking);
    }

    // Delete
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}