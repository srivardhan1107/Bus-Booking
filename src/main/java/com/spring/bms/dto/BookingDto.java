package com.spring.bms.dto;

import java.time.LocalDate;

import com.spring.bms.entity.BookingStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDto {

    private Long id;

    private Long userId;

    private Long busId;

    private int seatNumber;

    private LocalDate bookingDate;

    private BookingStatus status;
}