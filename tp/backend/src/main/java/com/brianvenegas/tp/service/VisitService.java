package com.brianvenegas.tp.service;

import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Visit> getAllVisit() {
        System.out.println("Getting all visits" + visitRepository.findAll());
        List<Visit> visits = visitRepository.findAll();
        visits.forEach(visit -> {
            Hibernate.initialize(visit.getUser());
            Hibernate.initialize(visit.getPark());
            Hibernate.initialize(visit.getUserAttractions());
        });
        return visits;
    }

    public Visit createVisit(Visit visit) {

        String userId = visit.getUser().getId();
        System.out.println("Creating visit for user ID: " + userId);

        User user = UserRepository.findById(visit.getUser().getId())
                .orElseGet(() -> {
                    User newUser = new User();
                    newUser.setId(userId);
                    newUser.setName("Default Name");
                    newUser.setEmail("Default Email");
                    return UserRepository.save(newUser);
                });

        // System.out.println("User found: " + user.getName());
        visit.setUser(user);

        System.out.println("Attempting to find park: " + visit.getPark().getId());
        Optional<Park> optionalPark = parkRepository.findById(visit.getPark().getId());

        if (optionalPark.isPresent()) {
            System.out.println("Park found: " + optionalPark.get().getName());
            visit.setPark(optionalPark.get());
        } else {
            throw new RuntimeException("Park not found");
        }
        return visitRepository.save(visit);
    }

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

    @Transactional
    public Visit.userAttraction addAttractionToVisit(Long visitId, Visit.userAttraction userAttraction) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(() -> new RuntimeException("Visit not found"));

        

        userAttraction.setVisit(visit);
        visit.getUserAttractions().add(userAttraction);
        visitRepository.save(visit);

        visitRepository.save(visit);
        return userAttraction;
    }

    public Optional<Visit> getVisitById(Long id) {
        return visitRepository.findById(id);
    }

    public List<Visit> getVisitsByUserId(String id) {
        System.out.println("Getting visits by user ID: " + id);
        System.out.println(visitRepository.findByUserId(id));
        return visitRepository.findByUserId(id);
    }

    public Visit saveVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    public void deleteVisit(Long id) {
        visitRepository.deleteById(id);
    }

    public List<userAttraction> getVisitAttractions(Long visitId) {
        Visit visit = visitRepository.findById(visitId).orElseThrow(() -> new RuntimeException("Visit not found"));
        return visit.getUserAttractions();
    }
}
