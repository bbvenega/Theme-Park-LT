package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Visit.userAttraction;

public interface UserAttractionRepository extends JpaRepository<userAttraction, Long> {
}
