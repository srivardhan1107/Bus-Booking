package com.spring.bms.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.bms.entity.Bus;
import com.spring.bms.entity.Seat;

@Repository
public interface SeatRepository extends JpaRepository<Seat, Long> {

    List<Seat> findByBus(Bus bus);

}