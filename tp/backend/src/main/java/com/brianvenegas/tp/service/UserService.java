// UserService is a collection of methods that interact with the database to retrieve and store data about users.
package com.brianvenegas.tp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.User;
import com.brianvenegas.tp.repository.UserRepository; // Import the User entity

@Service
public class UserService {

    // @Autowired injects the UserRepository dependency
    @Autowired
    private UserRepository userRepository;

    // Method to retrieve all users
    public List<User> getAllUser() {
        return userRepository.findAll(); // Returns all users in the database
    }

    // Method to create a new user
    public User createUser(User user) {
        return userRepository.save(user); // Saves the user entity to the database
    }

    // Method to retrieve a user by ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id); // Finds the user by ID or returns null if not found
    }

    // Method to save a user
    public User saveUser(User user) {
        return userRepository.save(user); // Saves the user entity to the database
    }

    // Method to delete a user by ID
    public void deleteUser(String id) {
        userRepository.deleteById(id); // Deletes the user by ID
    }

    // Method to update a user
    public User updateUser(String id, User userDetails) {
        return userRepository.findById(id).map(user -> {
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setVisits(userDetails.getVisits());
            return userRepository.save(user);
        }).orElseGet(() -> {
            userDetails.setId(id);
            return userRepository.save(userDetails);
        });
    }

}
