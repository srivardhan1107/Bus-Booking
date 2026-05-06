package com.spring.bms.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "seats")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Many seats belong to one bus
    @ManyToOne
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @Column(nullable = false)
    private int seatNumber;

    @Column(nullable = false)
    private boolean isBooked;
}