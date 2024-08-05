// SecurityConfig class that configures the security of the application. 
// It uses the NimbusJwtDecoder to decode the JWT token and the JwtAuthenticationConverter to convert the JWT token into an authentication object. 
// It also configures the security filter chain to allow access to the /public/** endpoint without authentication and to require authentication for all other endpoints. 
// The JWT decoder is configured to use the JWKS URI provided by Auth0 to fetch the public keys used to verify the JWT token signature.

package com.brianvenegas.tp.config;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Value("${auth0.domain}")
    private String auth0domain;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authz -> authz
                .requestMatchers("/public/**").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt());

        return http.build();
    }
    
    @Bean
    public JwtDecoder jwtDecoder() {
        
        String jwkSeturi = String.format("https://%s/.well-known/jwks.json", auth0domain);
        return NimbusJwtDecoder.withJwkSetUri(jwkSeturi).build();
    }

    // @Bean
    // public JwtAuthenticationConverter jwtAuthenticationConverter() {
    //     JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
    //     jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(jwt -> {

    //         Collection<GrantedAuthority> authorities = new HashSet<>();

    //         String userId = jwt.getSubject();
    //         System.out.println("User ID: " + userId);

    //         return authorities;
    //     });
    //     return jwtAuthenticationConverter;
    // }

}
