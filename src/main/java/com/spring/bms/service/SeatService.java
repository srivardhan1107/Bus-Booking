package com.spring.bms.service;

import com.spring.bms.dto.SeatDto;
import com.spring.bms.entity.Bus;
import com.spring.bms.entity.Seat;
import com.spring.bms.mapper.SeatMapper;
import com.spring.bms.repository.BusRepository;
import com.spring.bms.repository.SeatRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SeatService {

    private final SeatRepository seatRepository;
    private final BusRepository busRepository;

    // Create
    public SeatDto saveSeat(SeatDto seatDto) {

        Bus bus = busRepository.findById(seatDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        Seat seat = SeatMapper.toEntity(seatDto);
        seat.setBus(bus);

        Seat savedSeat = seatRepository.save(seat);

        return SeatMapper.toDTO(savedSeat);
    }

    // Get by Id
    public SeatDto getSeatById(Long id) {
        Seat seat = seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        return SeatMapper.toDTO(seat);
    }

    // Get all
    public List<SeatDto> getAllSeats() {
        return seatRepository.findAll()
                .stream()
                .map(SeatMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update
    public SeatDto updateSeat(Long id, SeatDto seatDto) {

        Seat existingSeat = seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found"));

        Bus bus = busRepository.findById(seatDto.getBusId())
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        existingSeat.setBus(bus);
        existingSeat.setSeatNumber(seatDto.getSeatNumber());
        existingSeat.setBooked(seatDto.isBooked());

        Seat updatedSeat = seatRepository.save(existingSeat);

        return SeatMapper.toDTO(updatedSeat);
    }

    // Delete
    public void deleteSeat(Long id) {
        seatRepository.deleteById(id);
    }
}