package com.brianvenegas.tp;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.brianvenegas.tp.client.ThemeParkApiClient; // Add this import statement
import com.brianvenegas.tp.model.Attraction; // Add this import statement
import com.brianvenegas.tp.model.Park; // Add this import statement
import com.brianvenegas.tp.model.User;

@SpringBootApplication
@EntityScan(basePackages = "com.brianvenegas.tp.model")
public class TpApplication {

    public static void main(String[] args) {
        SpringApplication.run(TpApplication.class, args);

        String DLID = "7340550b-c14d-4def-80bb-acdb51d49a66";

        System.out.println("Theme Park API Client");
        try {
            String response = ThemeParkApiClient.getDestinations();
            // System.out.println(response);

            List<Park> parks = ThemeParkApiClient.parseParks(response);

            System.out.println("Parks:");

            if (parks != null) {
                // parks.forEach(System.out::println);

                ThemeParkApiClient.getAttraction(DLID);
    
                // The code below will be implemented when the API is fully functional
                // for (Park park : parks) {
                //     for (Park.IndividualPark individualPark : park.getParks()) {
                //         System.out.println("Getting rides for park: " + individualPark.getName());
                //         String responseJSON = ThemeParkApiClient.getAttraction(individualPark.getId());
                //         List<Attraction> rides = ThemeParkApiClient.parseAttractions(responseJSON);
                //         individualPark.setAttraction(rides);
                //     }

                // }
            } else {
                System.out.println("No parks found");
            }

            System.out.println("Welcome to the Theme Park API Client!\n We are currently functioning for Disneyland Resort\n\n");
            System.out.println("Please set your username and password to access the API\n\n");

            User user = new User("admin", "admin", "admin");

            String userInputUsername;
            String userInputPassword;

            System.out.println("Enter your username: ");
            userInputUsername = System.console().readLine();
            while (!userInputUsername.equals(user.getEmail())) {
                System.out.println("Invalid username. Please try again: ");
                userInputUsername = System.console().readLine();
            }

            System.out.println("Enter your password: ");
            userInputPassword = System.console().readLine();
            while (!userInputPassword.equals(user.getPassword())) {
                System.out.println("Invalid password. Please try again: ");
                userInputPassword = System.console().readLine();
            }

            if (parks != null) {
                for (Park park : parks) {
                    System.out.println(park.getName() + "------------------------------------");
                    for (Park.IndividualPark individualPark : park.getParks()) {
                        System.out.println(individualPark.getName() + "------------------------------------");
                        for (Attraction ride : individualPark.getAttraction()) {
                            if (ride.getStatus().equals("OPERATING") && ride.getEntityType().equals("ATTRACTION")) {
                                if (ride.getQueue() != null && ride.getQueue().getStandby() != null) {

                                    System.out.printf("%ss: standby wait time: %d\n", ride.getName(), ride.getQueue().getStandby().getWaitTime());
                                }
                            }
                        }
                    }
                }
            } else {
                System.out.println("No parks found");
            }

            // The code below will be implemented when the API is fully functional
            // if (parks != null) {
            //     for (Park park : parks) {
            //         System.out.println(park.getName() + "------------------------------------");
            //         for (Park.IndividualPark individualPark : park.getParks()) {
            //             System.out.println(individualPark.getName() + "------------------------------------");
            //             for (Attraction ride : individualPark.getAttraction()) {
            //                 if (ride.getStatus().equals("OPERATING") && ride.getEntityType().equals("ATTRACTION")) {
            //                     if (ride.getQueue() != null && ride.getQueue().getStandby() != null) {
            //                         System.out.printf("%ss: standby wait time: %d\n", ride.getName(), ride.getQueue().getStandby().getWaitTime());
            //                     }
            //                 } 
            //             }
            //         }
            //     }
            // } else {
            //     System.out.println("No parks found");
            // }
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Exiting...");
        System.exit(0);
    }
}
