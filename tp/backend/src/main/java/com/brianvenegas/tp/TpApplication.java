package com.brianvenegas.tp;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.brianvenegas.tp.client.ThemeParkApiClient; // Add this import statement
import com.brianvenegas.tp.model.Park; // Add this import statement

@SpringBootApplication
public class TpApplication {

    public static void main(String[] args) {
        SpringApplication.run(TpApplication.class, args);

        System.out.println("Theme Park API Client");
        try {
            String response = ThemeParkApiClient.getDestinations();
            // System.out.println(response);

            List<Park> parks = ThemeParkApiClient.parseParks(response);

            System.out.println("Parks:");

            if (parks != null) {
                parks.forEach(System.out::println);
            } else {
                System.out.println("No parks found");
            }

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

    }
}
