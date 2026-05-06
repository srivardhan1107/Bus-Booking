package com.spring.bms.controller;


import com.spring.bms.dto.BusDto;
import com.spring.bms.service.BusService;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/buses")
@RequiredArgsConstructor
@CrossOrigin("*")
public class BusController {

    private final BusService busService;

  
    @PostMapping
    public ResponseEntity<BusDto> createBus(@RequestBody BusDto busDto) {

        BusDto savedBus = busService.saveBus(busDto);

        return new ResponseEntity<>(savedBus, HttpStatus.CREATED);
    }

   
    @GetMapping("/{id}")
    public ResponseEntity<BusDto> getBusById(@PathVariable Long id) {

        BusDto busDto = busService.getBusById(id);

        return ResponseEntity.ok(busDto);
    }

    
    @GetMapping
    public ResponseEntity<List<BusDto>> getAllBuses() {

        List<BusDto> buses = busService.getAllBuses();

        return ResponseEntity.ok(buses);
    }

    
    @PutMapping("/{id}")
    public ResponseEntity<BusDto> updateBus(
            @PathVariable Long id,
            @RequestBody BusDto busDto) {

        BusDto updatedBus = busService.updateBus(id, busDto);

        return ResponseEntity.ok(updatedBus);
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBus(@PathVariable Long id) {

        busService.deleteBus(id);

        return ResponseEntity.ok("Bus Deleted Successfully");
    }
}
