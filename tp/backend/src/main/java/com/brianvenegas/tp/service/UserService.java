package com.brianvenegas.tp.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.User;
import com.brianvenegas.tp.repository.UserRepository;

// @Service indicates this class contains business logic
@Service
public class UserService {

    // @Autowired injects the UserRepository dependency
    @Autowired
    private UserRepository userRepository;

    // Method to create a new user
    public User createUser(User user) {
        return userRepository.save(user); // Saves the user entity to the database
    }

    // Method to retrieve a user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null); // Finds the user by ID or returns null if not found
    }
}
