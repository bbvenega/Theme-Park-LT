package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Attraction;

public interface AttractionRepository extends JpaRepository<Attraction, String>{
    
}
