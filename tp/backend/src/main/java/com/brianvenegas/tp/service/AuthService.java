// AuthService class that gets the user from the principal

package com.brianvenegas.tp.service;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.User;



@Service
public class AuthService {

    public User getUserFromPrincipal(@AuthenticationPrincipal OidcUser oidcUser) {
        String oktaId = oidcUser.getSubject();
        String email = oidcUser.getEmail();
        String name = oidcUser.getFullName();

        User user = new User();
        user.setEmail(email);
        user.setName(name);

        return user;
    }
}
