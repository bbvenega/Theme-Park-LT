package com.brianvenegas.tp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;

import com.brianvenegas.tp.model.User;
import com.brianvenegas.tp.service.UserService;


public class AuthCrontoller {
    

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<User> authenticate(@AuthenticationPrincipal Jwt jwt) {
        String auth0Id = jwt.getSubject();
        String email = jwt.getClaim("email");
        String name = jwt.getClaim("name");

        User user = new User();
        user.setAuth0Id(auth0Id);
        user.setEmail(email);
        user.setName(name);

        User savedUser = userService.saveOrUpdateUser(user);
        return ResponseEntity.ok(savedUser);
    }
}
