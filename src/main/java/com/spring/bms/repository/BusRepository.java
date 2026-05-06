package com.spring.bms.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.bms.entity.Bus;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {

    List<Bus> findBySourceAndDestination(String source, String destination);

}
