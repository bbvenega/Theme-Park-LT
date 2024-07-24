// User Attraction Repository: Communicates with the database to perform CRUD operations on a visit's User Attraction entity.

package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Visit.userAttraction;

public interface UserAttractionRepository extends JpaRepository<userAttraction, Long> {
}
