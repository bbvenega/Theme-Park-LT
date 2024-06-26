package com.brianvenegas.tp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class MyController {

    @GetMapping("/greeting")
    public String getGreeting() {
        return "Hello from Spring Boot!";
    }
}
