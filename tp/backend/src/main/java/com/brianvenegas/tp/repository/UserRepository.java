package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brianvenegas.tp.model.User;


@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    
}
