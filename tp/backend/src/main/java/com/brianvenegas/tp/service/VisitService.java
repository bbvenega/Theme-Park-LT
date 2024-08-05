// VisitService is a collection of methods that interact with the database to retrieve and store data about visits.
package com.brianvenegas.tp.service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.model.User;
import com.brianvenegas.tp.model.Visit;
import com.brianvenegas.tp.model.Visit.userAttraction;
import com.brianvenegas.tp.repository.AttractionRepository;
import com.brianvenegas.tp.repository.ParkRepository;
import com.brianvenegas.tp.repository.UserRepository;
import com.brianvenegas.tp.repository.VisitRepository;

import jakarta.transaction.Transactional;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    @Autowired
    private UserRepository UserRepository;

    @Autowired
    private AttractionRepository attractionRepository;

    @Autowired
    private ParkRepository parkRepository;

    // Method to retrieve all visits
    public List<Visit> getAllVisit() {
        List<Visit> visits = visitRepository.findAll();
        visits.forEach(visit -> {
            Hibernate.initialize(visit.getUser());
            Hibernate.initialize(visit.getPark());
            Hibernate.initialize(visit.getUserAttractions());
        });
        return visits;
    }

    // Method to create a new visit
    public Visit createVisit(Visit visit) {
        String userId = visit.getUser().getId();
        User user = UserRepository.findById(visit.getUser().getId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(userId);
                    newUser.setName("Default Name");
                    newUser.setEmail("Default Email");
                    return UserRepository.save(newUser);
                });
        visit.setUser(user);

        Optional<Park> optionalPark = parkRepository.findById(visit.getPark().getId());

        if (optionalPark.isPresent()) {
            visit.setPark(optionalPark.get());
        } else {
            throw new RuntimeException("Park not found");
        }
        return visitRepository.save(visit);
    }

    // Method to update a visit
    public Visit updateVisit(Long id, Visit visitDetails) {
        return visitRepository.findById(id).map(visit -> {
            visit.setParkName(visitDetails.getParkName());
            visit.setDateVisited(visitDetails.getDateVisited());
            visit.setUserAttractions(visitDetails.getUserAttractions());
            return visitRepository.save(visit);
        }).orElseGet(() -> {
            visitDetails.setId(id);
            return visitRepository.save(visitDetails);
        });
    }

    // Method to add an attraction to a visit
    @Transactional
    public Visit.userAttraction addAttractionToVisit(Long visitId, Visit.userAttraction userAttraction) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(() -> new RuntimeException("Visit not found"));

        // Ensure the userAttraction has a valid Visit reference
        userAttraction.setVisit(visit);

        // Ensure the userAttraction has a valid Attraction reference
        Attraction attraction = attractionRepository.findById(userAttraction.getAttractionId())
                .orElseThrow(() -> new RuntimeException("Attraction not found"));

        // Add the userAttraction to the visit's list
        visit.getUserAttractions().add(userAttraction);

        // Save the visit, which should cascade the save to userAttractions
        visitRepository.save(visit);
        return userAttraction;
    }

    // Method to retrieve a visit by ID
    public Optional<Visit> getVisitById(Long id) {
        return visitRepository.findById(id);
    }

    // Method to retrieve all visits by user ID
    public List<Visit> getVisitsByUserId(String id) {
        return visitRepository.findByUserId(id);
    }

    // Method to save a visit
    public Visit saveVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    // Method to delete a visit by ID
    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    // Method to retrieve all attractions for a visit
    public List<userAttraction> getVisitAttractions(Long visitId) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(() -> new RuntimeException("Visit not found"));
        return visit.getUserAttractions();
    }

    // Method to update a visit's individual attraction
    public Visit updateVisitAttraction(Long id, Long attractionId, userAttraction userAttraction) {
        Visit visit = visitRepository.findById(id).orElse(null);
        List<userAttraction> rides = visit.getUserAttractions();
        rides.forEach(ride -> {
            if (Objects.equals(ride.getId(), attractionId)) {
                ride.setAttractionName(userAttraction.getAttractionName());
                ride.setPostedWaitTime(userAttraction.getPostedWaitTime());
                ride.setActualWaitTime(userAttraction.getActualWaitTime());
                ride.setFastpass(userAttraction.isFastpass());
                ride.setSingleRider(userAttraction.isSingleRider());
                ride.setBrokeDown(userAttraction.isBrokeDown());
                ride.setAttractionId(userAttraction.getAttractionId());
            }
        });
        visitRepository.save(visit);

        return visit;

    }

    // Method to delete a visit's individual attraction
    public Visit deleteVisitAttraction(Long id, Long attractionId) {
        Visit visit = visitRepository.findById(id).orElse(null);
        List<userAttraction> rides = visit.getUserAttractions();
        rides.removeIf(ride -> Objects.equals(ride.getId(), attractionId));
        visitRepository.save(visit);
        return visit;
    }


};
