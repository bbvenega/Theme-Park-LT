// ThemeParkService is a collection of methods that interact with the database / API to retrieve and store data about theme parks and attractions.
package com.brianvenegas.tp.service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.client.ThemeParkApiClient;
import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.IndividualPark;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.repository.AttractionRepository;
import com.brianvenegas.tp.repository.IndividualParkRepository;
import com.brianvenegas.tp.repository.ParkRepository;

import jakarta.annotation.PostConstruct;

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

    // The function below is responsible for loading the park and attraction data from the API and saving it to the database.
    // It calls the ThemeParkApiClient's getDestinations() method to fetch the park data and parse it into a list of Park objects.
    // It then saves the park data to the database using the parkRepository.
    // It then calls the ThemeParkApiClient's getAttraction() method to fetch the attraction data for each park's indivdual park and parse it into a list of Attraction objects.
    // It saves the attraction data to the database using the attractionRepository.
    // The function uses CompletableFuture to fetch the attraction data for each park asynchronously.
    // It retries the data loading process up to 3 times if it fails.
    @Scheduled(fixedRate = 300000)
    private void loadParkandAttractions() {

        logger.info("Initializing ThemeParkService...");
        boolean dataLoaded = false;
        int attempts = 0;

        // Retry loading data up to 3 times
        while (!dataLoaded && attempts < 3) {
            try {
                // Get list of parks
                String response = ThemeParkApiClient.getDestinations();
                List<CompletableFuture<Void>> futures = new ArrayList<>();
                parks = ThemeParkApiClient.parseParks(response);

                // For every park: save park and for every individual park: save individual park and set that individual park's park to the park
                for (Park park : parks) {
                    if (!parkRepository.findById(park.getId()).isPresent()) {
                        parkRepository.save(park);
                    }
                    for (IndividualPark individualPark : park.getParks()) {
                        if (!individualParkRepository.findById(individualPark.getId()).isPresent()) {
                            individualPark.setPark(park);
                            individualParkRepository.save(individualPark);
                        }

                    }
                }

                logger.info("Parks data loaded successfully ~ Attempting to load attractions data...");

                // For every park in park, for every individual park in park:
                for (Park park : parks) {
                    for (IndividualPark individualPark : park.getParks()) {
                        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
                            try {
                                // Call ThemeParkApiClient.getAttraction() to get the attractions for the individual park in a JSON format
                                String responseJSON = ThemeParkApiClient.getAttraction(individualPark.getId());
                                // Call ThemeParkApiClient.parseAttractions() to parse the JSON response into a list of Attraction objects
                                List<Attraction> rides = ThemeParkApiClient.parseAttractions(responseJSON);

                                // For every attraction in rides, set the individual park of the attraction to the individual park and save the attraction
                                for (Attraction attraction : rides) {
                                    attraction.setIndividualPark(individualPark);
                                    attractionRepository.save(attraction);
                                }
                            } catch (IOException | InterruptedException e) {
                                logger.error("Error fetching attractions for park: " + individualPark.getName(), e);
                            }
                        }).orTimeout(120, TimeUnit.SECONDS); // Timeout after 10 seconds
                        futures.add(future);
                    }
                }
                // Wait for all futures to complete
                CompletableFuture.allOf(futures.toArray(new CompletableFuture[0])).join();
                dataLoaded = true;

                System.out.printf("Parks and Attractions data loaded successfully @ %s", LocalDateTime.now());

                int parkCount = 0;
                int attractionCount = 0;
                Set<String> uniqueAttractionIds = new HashSet<>();
                Set<String> uniqueParkIds = new HashSet<>();
                for (Park park : parks) {

                    for (IndividualPark individualPark : park.getParks()) {
                        String parkId = individualPark.getId();
                        if (!uniqueParkIds.contains(parkId)) {
                            uniqueParkIds.add(parkId);
                            System.out.printf("%d: %s\n", parkCount, individualPark.getName());
                            parkCount++;

                        }
                    }

                    for (Attraction attraction : attractionRepository.findAll()) {
                        String attractionId = attraction.getId();

                        if (!uniqueAttractionIds.contains(attractionId)
                                && attraction.getEntityType().equals("ATTRACTION")) {

                            uniqueAttractionIds.add(attractionId);  // Add the ID to the set if it passes the checks
                            // System.out.printf("%d: %s %s\n", attractionCount, attraction.getIndividualPark().getName(), attraction.getName());
                            attractionCount++;
                        }
                    }
                }

                System.out.printf("Parks: %d, Attractions: %d\n", parkCount, attractionCount);
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

    // GetParks returns a list of all parks
    public List<Park> getParks() {
        return parks;
    }

    // GetAttractions returns a list of all attractions
    public List<Attraction> getAttractions() {
        return attractionRepository.findAll();
    }

    // GetAttractionByIndividualPark returns a list of attractions for a specific individual park
    public List<Attraction> getAttractionByIndividualPark(IndividualPark individualParkId) {
        return attractionRepository.findByIndividualPark(individualParkId);
    }

    // GetParkByID returns a park by its ID
    public Park getParkByID(String parkId) {
        for (Park park : parks) {
            if (park.getId().equals(parkId)) {
                return park;
            }
        }
        return null;
    }

    // GetAttractionsByIndividualParkId returns a list of attractions for a specific park by its ID
    public List<Attraction> getAttractionsByIndividualParkId(String parkId) {
        return individualParkRepository.findById(parkId)
                .map(IndividualPark::getAttractions)
                .orElseThrow(() -> new RuntimeException("IndividualPark not found with id " + parkId));
    }

}
