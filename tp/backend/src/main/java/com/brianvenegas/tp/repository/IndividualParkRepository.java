// Individual Park Repository: Communicates with the database to perform CRUD operations on the Individual Park entity.
package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brianvenegas.tp.model.IndividualPark;

@Repository
public interface IndividualParkRepository extends JpaRepository<IndividualPark, String> {
   
}
