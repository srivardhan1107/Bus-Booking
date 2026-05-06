package com.spring.bms.dto;

import java.time.LocalTime;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BusDto{

    private Long id;

    private String busName;

    private String busNumber;

    private String source;

    private String destination;

    private LocalTime departureTime;

    private LocalTime arrivalTime;

    private Integer totalSeats;
}