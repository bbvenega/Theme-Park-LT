package com.brianvenegas.tp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Visit;

public interface VisitRepository extends JpaRepository<Visit, String> {
    List<Visit> findByUserId(String id);
}
