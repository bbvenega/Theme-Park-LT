// MyController class that contains a simple GET endpoint that returns a greeting message. Used to test the application.

package com.brianvenegas.tp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
// @CrossOrigin(origins = "https://bbvenega.github.io")
@RestController
@RequestMapping("/api")
public class MyController {

    @GetMapping("/greeting")
    public String getGreeting() {
        return "Hello from Spring Boot!";
    }
}
