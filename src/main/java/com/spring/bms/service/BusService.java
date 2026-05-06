package com.spring.bms.service;

import com.spring.bms.dto.BusDto;
import com.spring.bms.entity.Bus;
import com.spring.bms.mapper.BusMapper;
import com.spring.bms.repository.BusRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BusService {

    private final BusRepository busRepository;

    // Create
    public BusDto saveBus(BusDto busDto) {
        Bus bus = BusMapper.toEntity(busDto);
        Bus savedBus = busRepository.save(bus);
        return BusMapper.toDTO(savedBus);
    }

    // Get by Id
    public BusDto getBusById(Long id) {
        Bus bus = busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        return BusMapper.toDTO(bus);
    }

    // Get all
    public List<BusDto> getAllBuses() {
        return busRepository.findAll()
                .stream()
                .map(BusMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Update
    public BusDto updateBus(Long id, BusDto busDto) {
        Bus existingBus = busRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bus not found"));

        existingBus.setBusName(busDto.getBusName());
        existingBus.setBusNumber(busDto.getBusNumber());
        existingBus.setSource(busDto.getSource());
        existingBus.setDestination(busDto.getDestination());
        existingBus.setDepartureTime(busDto.getDepartureTime());
        existingBus.setArrivalTime(busDto.getArrivalTime());
        existingBus.setTotalSeats(busDto.getTotalSeats());

        Bus updatedBus = busRepository.save(existingBus);

        return BusMapper.toDTO(updatedBus);
    }

    // Delete
    public void deleteBus(Long id) {
        busRepository.deleteById(id);
    }
}