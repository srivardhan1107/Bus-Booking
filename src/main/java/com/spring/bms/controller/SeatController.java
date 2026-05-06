package com.spring.bms.controller;


import com.spring.bms.dto.SeatDto;
import com.spring.bms.service.SeatService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@RequiredArgsConstructor
@CrossOrigin("*")
public class SeatController {

    private final SeatService seatService;

    // Create Seat
    @PostMapping
    public ResponseEntity<SeatDto> createSeat(@RequestBody SeatDto seatDto) {

        SeatDto savedSeat = seatService.saveSeat(seatDto);

        return new ResponseEntity<>(savedSeat, HttpStatus.CREATED);
    }


    @GetMapping("/{id}")
    public ResponseEntity<SeatDto> getSeatById(@PathVariable Long id) {

        SeatDto seatDto = seatService.getSeatById(id);

        return ResponseEntity.ok(seatDto);
    }


    @GetMapping
    public ResponseEntity<List<SeatDto>> getAllSeats() {

        List<SeatDto> seats = seatService.getAllSeats();

        return ResponseEntity.ok(seats);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SeatDto> updateSeat(
            @PathVariable Long id,
            @RequestBody SeatDto seatDto) {

        SeatDto updatedSeat = seatService.updateSeat(id, seatDto);

        return ResponseEntity.ok(updatedSeat);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSeat(@PathVariable Long id) {

        seatService.deleteSeat(id);

        return ResponseEntity.ok("Seat Deleted Successfully");
    }
}