package com.brianvenegas.tp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.brianvenegas.tp.client.ThemeParkApiClient;
import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;

import jakarta.annotation.PostConstruct;

@Service
public class ThemeParkService {
    

    private List<Park> parks = new ArrayList<>();

    @PostConstruct
    public void init() {
        System.out.println("THEME PARK SERVICE: Running now ----------------------");
        try {
            String response = ThemeParkApiClient.getDestinations();
            // System.out.println(response);

             parks = ThemeParkApiClient.parseParks(response);

            System.out.println("Parks:");

            if (parks != null) {
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
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }

    }

    public List<Park> getParks() {
        return parks;
    }

    public List<Attraction> getAttractions(String parkId) {
        for (Park park : parks) {
            for (Park.IndividualPark individualPark : park.getParks()) {
                if (individualPark.getId().equals(parkId)) {
                    return individualPark.getAttraction();
                }
            }
        }
        return new ArrayList<>();
    }
}
