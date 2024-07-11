package com.brianvenegas.tp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.client.ThemeParkApiClient;
import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;

import jakarta.annotation.PostConstruct;

@Service
public class ThemeParkService {

    private static final Logger logger = LoggerFactory.getLogger(ThemeParkService.class);

    private List<Park> parks = new ArrayList<>();

    @PostConstruct
    public void init() {
        logger.info("Initializing ThemeParkService...");
        boolean dataLoaded = false;
        int attempts = 0;

        while (!dataLoaded && attempts < 3) {
            try {
                String response = ThemeParkApiClient.getDestinations();
                // System.out.println(response);
                List<CompletableFuture<Void>> futures = new ArrayList<>();
                parks = ThemeParkApiClient.parseParks(response);
                dataLoaded = true;
                logger.info("Parks data loaded successfully");


                for (Park park : parks) {
                    for (Park.IndividualPark individualPark : park.getParks()) {
                        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                            try {
                                String responseJSON = ThemeParkApiClient.getAttraction(individualPark.getId());
                                List<Attraction> rides = ThemeParkApiClient.parseAttractions(responseJSON);
                                individualPark.setAttraction(rides);
                            } catch (IOException | InterruptedException e) {
                                logger.error("Error fetching attractions for park: " + individualPark.getName(), e);
                            }
                        });
                        futures.add(future);
                    }
                }
                // Wait for all futures to complete
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
            } catch (IOException | InterruptedException e) {
                logger.error("Error initializing parks", e);
            }
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
