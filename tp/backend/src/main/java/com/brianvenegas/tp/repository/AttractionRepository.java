package com.brianvenegas.tp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;


public interface AttractionRepository extends JpaRepository<Attraction, String>{
    List<Attraction> findByIndividualPark(Park.IndividualPark individualPark);
}
