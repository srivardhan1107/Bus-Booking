package com.spring.bms.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.spring.bms.entity.Booking;
import com.spring.bms.entity.Bus;
import com.spring.bms.entity.User;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUser(User user);

    List<Booking> findByBus(Bus bus);

}