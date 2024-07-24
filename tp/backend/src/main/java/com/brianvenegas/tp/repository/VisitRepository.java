// Visit Repository: Communicates with the database to perform CRUD operations on a Visit entity.

package com.brianvenegas.tp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.brianvenegas.tp.model.Visit;

public interface VisitRepository extends JpaRepository<Visit, Long> {
    List<Visit> findByUserId(String userId);
    // Visit findById(long id);
}
