package com.spring.bms.mapper;

import com.spring.bms.dto.BookingDto;
import com.spring.bms.entity.Booking;
import com.spring.bms.entity.Bus;
import com.spring.bms.entity.User;

public class BookingMapper {
	public static BookingDto toDTO(Booking booking) {
        if (booking == null) return null;

        return BookingDto.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .busId(booking.getBus().getId())
                .seatNumber(booking.getSeatNumber())
                .bookingDate(booking.getBookingDate())
                .status(booking.getStatus())
                .build();
    }

    public static Booking toEntity(BookingDto dto) {
        if (dto == null) return null;

        User user = new User();
        user.setId(dto.getUserId());

        Bus bus = new Bus();
        bus.setId(dto.getBusId());

        return Booking.builder()
                .id(dto.getId())
                .user(user)
                .bus(bus)
                .seatNumber(dto.getSeatNumber())
                .bookingDate(dto.getBookingDate())
                .status(dto.getStatus())
                .build();
    }
}
