package com.spring.bms.mapper;

import com.spring.bms.dto.BusDto;
import com.spring.bms.entity.Bus;

public class BusMapper {
	
	 public static BusDto toDTO(Bus bus) {
	        if (bus == null) return null;

	        return BusDto.builder()
	                .id(bus.getId())
	                .busName(bus.getBusName())
	                .busNumber(bus.getBusNumber())
	                .source(bus.getSource())
	                .destination(bus.getDestination())
	                .departureTime(bus.getDepartureTime())
	                .arrivalTime(bus.getArrivalTime())
	                .totalSeats(bus.getTotalSeats())
	                .build();
	    }

	    public static Bus toEntity(BusDto dto) {
	        if (dto == null) return null;

	        Bus bus = new Bus();

	        bus.setId(dto.getId());
	        bus.setBusName(dto.getBusName());
	        bus.setBusNumber(dto.getBusNumber());
	        bus.setSource(dto.getSource());
	        bus.setDestination(dto.getDestination());
	        bus.setDepartureTime(dto.getDepartureTime());
	        bus.setArrivalTime(dto.getArrivalTime());
	        bus.setTotalSeats(dto.getTotalSeats());

	        return bus;
	    }
}
