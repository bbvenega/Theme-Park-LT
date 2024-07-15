package com.brianvenegas.tp.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.client.ThemeParkApiClient;
import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.repository.AttractionRepository;
import com.brianvenegas.tp.repository.IndividualParkRepository;
import com.brianvenegas.tp.repository.ParkRepository;

import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

@Service
public class ThemeParkService {

    private static final Logger logger = LoggerFactory.getLogger(ThemeParkService.class);
    private List<Park> parks = new ArrayList<>();

    @Autowired
    private ParkRepository parkRepository;

    @Autowired
    private IndividualParkRepository individualParkRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @PostConstruct
    public void init() {
        loadParkandAttractions();
    }

    @Transactional
    private void loadParkandAttractions() {
        logger.info("Initializing ThemeParkService...");
        boolean dataLoaded = false;
        int attempts = 0;

        while (!dataLoaded && attempts < 3) {
            try {
                String response = ThemeParkApiClient.getDestinations();

                // System.out.println(response);
                List<CompletableFuture<Void>> futures = new ArrayList<>();
                parks = ThemeParkApiClient.parseParks(response);

                for (Park park : parks) {
                    // logger.info("Saved park: {}", park.getName());
                    parkRepository.save(park);

                    for (Park.IndividualPark individualPark : park.getParks()) {
                        individualPark.setPark(park);
                        logger.info("Saved individual park: {}", individualPark.getName());
                        individualParkRepository.save(individualPark);
                    }
                }

                logger.info("Parks data loaded successfully");

                for (Park park : parks) {
                    for (Park.IndividualPark individualPark : park.getParks()) {
                        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                            try {
                                // logger.info("Fetching attractions for park: " + individualPark.getName());
                                String responseJSON = ThemeParkApiClient.getAttraction(individualPark.getId());
                                // logger.info("Attractions loaded for " + individualPark.getName());
                                List<Attraction> rides = ThemeParkApiClient.parseAttractions(responseJSON);
                                individualPark.setAttractions(rides);

                                for (Attraction attraction : rides) {
                                    attraction.setIndividualPark(individualPark);
                                    if (attraction.getEntityType().equals("ATTRACTION") && attraction.getStatus().equals("OPERATING")) {
                                        if (attraction.getQueue() != null && attraction.getQueue().getStandby() != null) {
                                            // logger.info("Attraction: {} - Wait Time: {}", attraction.getName(), attraction.getQueue().getStandby().getWaitTime());
                                        } else {
                                            // logger.info("Attraction: {} - Wait Time: N/A", attraction.getName());

                                        }
                                    }
                                    attractionRepository.save(attraction);
                                }
                                individualParkRepository.save(individualPark);
                            } catch (IOException | InterruptedException e) {
                                logger.error("Error fetching attractions for park: " + individualPark.getName(), e);
                            }
                        }).orTimeout(10, TimeUnit.SECONDS); // Timeout after 10 seconds
                        futures.add(future);
                    }
                }
                // Wait for all futures to complete
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                dataLoaded = true;
                logger.info("Parks and Attractions data loaded successfully");
            } catch (IOException | InterruptedException e) {
                attempts++;
                logger.error("Error initializing parks", e);
                try {
                    Thread.sleep(1000 * attempts);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }

            }

        }

        if (!dataLoaded) {
            logger.error("Failed to load parks data after " + attempts + " attempts");
        }

    }

    public List<Park> getParks() {
        return parks;
    }

    public List<Attraction> getAttractions(String parkId) {
        for (Park park : parks) {
            for (Park.IndividualPark individualPark : park.getParks()) {
                if (individualPark.getId().equals(parkId)) {
                    return individualPark.getAttractions();
                }
            }
        }
        return new ArrayList<>();
    }

    public List<Attraction> getAttractionByIndividualPark(Park.IndividualPark individualParkId) {
        return attractionRepository.findByIndividualPark(individualParkId);
    }

    public Park getParkByID(String parkId) {
        for (Park park : parks) {
            if (park.getId().equals(parkId)) {
                return park;
            }
        }
        return null;
    }
}
