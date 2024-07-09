package com.brianvenegas.tp.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.User; // Import the User entity
import com.brianvenegas.tp.repository.UserRepository; // Import the UserRepository interface


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

    public Optional<User> getUserByAuth0Id(String auth0Id) {
        return userRepository.findByAuth0Id(auth0Id); // Finds the user by Auth0 ID
    }

    public User saveOrUpdateUser(User user) {
        Optional<User> existingUser = userRepository.findByAuth0Id(user.getAuthoID());

        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            userToUpdate.setName(user.getName());
            userToUpdate.setEmail(user.getEmail());
            return userRepository.save(userToUpdate);
        } else {
            return userRepository.save(user);
        }
    }
}
