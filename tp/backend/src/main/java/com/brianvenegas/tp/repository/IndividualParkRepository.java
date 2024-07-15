package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brianvenegas.tp.model.Park.IndividualPark;

@Repository
public interface IndividualParkRepository extends JpaRepository<IndividualPark, String> {
}
