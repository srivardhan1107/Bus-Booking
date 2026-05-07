package com.spring.bms.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatDto {

    private Long id;

    private Long busId;

    private Integer seatNumber;

    private Boolean booked;
}