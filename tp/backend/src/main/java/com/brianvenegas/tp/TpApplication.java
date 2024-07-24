package com.brianvenegas.tp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan(basePackages = "com.brianvenegas.tp.model")
public class TpApplication {

    public static void main(String[] args) {
        SpringApplication.run(TpApplication.class, args);
    }
}
