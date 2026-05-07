package com.spring.bms.mapper;

import com.spring.bms.dto.SeatDto;
import com.spring.bms.entity.Bus;
import com.spring.bms.entity.Seat;

public class SeatMapper {

    public static SeatDto toDTO(Seat seat) {

        if (seat == null)
            return null;

        return SeatDto.builder()
                .id(seat.getId())
                .busId(seat.getBus().getId())
                .seatNumber(seat.getSeatNumber())
                .booked(seat.isBooked())
                .build();
    }

    public static Seat toEntity(SeatDto dto) {

        if (dto == null)
            return null;

        Bus bus = new Bus();
        bus.setId(dto.getBusId());

        return Seat.builder()
                .id(dto.getId())
                .bus(bus)
                .seatNumber(dto.getSeatNumber())
                .booked(dto.isBooked())
                .build();
    }
}