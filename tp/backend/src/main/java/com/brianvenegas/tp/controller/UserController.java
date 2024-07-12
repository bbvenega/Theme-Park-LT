package com.brianvenegas.tp.controller;

import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.User;
import com.brianvenegas.tp.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAllUser() {
        logger.info("Getting all users");
        return userService.getAllUser();
    }

    @PostMapping
    public User createUser(@RequestBody User user) {
        logger.info("Creating a new user: {}", user);
        return userService.createUser(user);
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User userDetails) {
        logger.info("Updating user with ID{}: {}", id, userDetails);
        return userService.updateUser(id, userDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable String id) {
        logger.info("Deleting user with ID: {}", id);
        userService.deleteUser(id);
    }

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        logger.info("Getting user with ID: {}", id);
        return userService.getUserById(id);
    }
}
