package com.brianvenegas.tp.exception;

// Custom exception for handling cases where a user is not found
public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String message) {
        super(message);
    }
}
