package com.brianvenegas.tp;

import java.io.IOException;
import java.util.List;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import com.brianvenegas.tp.client.ThemeParkApiClient; // Add this import statement
import com.brianvenegas.tp.model.Attraction; // Add this import statement
import com.brianvenegas.tp.model.Park; // Add this import statement

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

                // ThemeParkApiClient.getAttraction(DLID);
                for (Park park : parks) {
                    for (Park.IndividualPark individualPark : park.getParks()) {
                        System.out.println("Getting rides for park: " + individualPark.getName());
                        String responseJSON = ThemeParkApiClient.getAttraction(individualPark.getId());
                        List<Attraction> rides = ThemeParkApiClient.parseAttractions(responseJSON);
                        individualPark.setAttraction(rides);
                    }

                }
            } else {
                System.out.println("No parks found");
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

        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Exiting...");
        System.exit(0);
    }
}
