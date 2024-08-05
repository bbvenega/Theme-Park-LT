// User Repository: Communicates with the database to perform CRUD operations on a User entity.

package com.brianvenegas.tp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.brianvenegas.tp.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, String> {
    
}
