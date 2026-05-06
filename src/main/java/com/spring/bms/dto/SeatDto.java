package com.spring.bms.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SeatDto {

    private Long id;

    private Long busId;

    private int seatNumber;

    private boolean isBooked;
}