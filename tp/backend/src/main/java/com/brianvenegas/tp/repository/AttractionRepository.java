// Attractions Repository: Communicates with the database to perform CRUD operations on the Attraction entity.

package com.brianvenegas.tp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.IndividualPark;


public interface AttractionRepository extends JpaRepository<Attraction, String>{
    List<Attraction> findByIndividualPark(IndividualPark individualPark);
   
}
