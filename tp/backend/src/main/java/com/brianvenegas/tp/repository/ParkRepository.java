package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Park;

public interface ParkRepository extends JpaRepository<Park, String> {
    Park findByName(String name);
    
}
