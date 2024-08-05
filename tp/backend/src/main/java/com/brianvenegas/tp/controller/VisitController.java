// VisitController is the controller class for the Visit model. It contains all the endpoints for the Visit model.
package com.brianvenegas.tp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.Visit;
import com.brianvenegas.tp.model.Visit.userAttraction;
import com.brianvenegas.tp.service.ThemeParkService;
import com.brianvenegas.tp.service.VisitService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/visits")
public class VisitController {

    private static final Logger logger = LoggerFactory.getLogger(VisitService.class);

    @Autowired
    private VisitService visitService;

    @Autowired
    private ThemeParkService ThemeParkService;

    // Get all visits
    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisit() {
        System.out.println("Getting all visits");
        List<Visit> visits = visitService.getAllVisit();
        return new ResponseEntity<>(visits, HttpStatus.OK);
    }

    // Get a visit by ID
    @GetMapping("/{id}") // Get a visit by ID
    public ResponseEntity<?> getVisitById(@PathVariable Long id, @AuthenticationPrincipal Jwt jwt) {
        Optional<Visit> optionalVisit = visitService.getVisitById(id);
        
        // Check if the visit exists
        if (optionalVisit.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Visit not found.");
        }

        Visit visit = optionalVisit.get();
        System.out.println("Visit: " +visit);
        System.out.println("Visit's UserID: " + visit.getUser().getId());


        String userId = jwt.getSubject();
        userId = userId.substring(userId.lastIndexOf("|") + 1);
        System.out.println("User ID: " + userId);
        // Check if the authenticated user owns this visit
        System.out.println(visit.getUser().getId());
        if (!visit.getUser().getId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to access this visit.");
        }
        return ResponseEntity.ok(visit);
    }

    // Get all visits by user ID
    @GetMapping("/user/{id}") // Get all visits by patient ID
    public List<Visit> getVisitsByUserId(@PathVariable String id) {
        return visitService.getVisitsByUserId(id);
    }

    // Create a new visit
    @PostMapping
    public Visit createVisit(@RequestBody Visit visit) {
        if (visit.getUserAttractions() == null) {
            visit.setUserAttractions(new ArrayList<>());
        }
        return visitService.createVisit(visit);
    }

    // Update a visit
    @PutMapping("/{id}")
    public Visit updateVisit(@PathVariable Long id, @RequestBody Visit visitDetails) {
        return visitService.updateVisit(id, visitDetails);
    }

    // Update a visit's individual attraction
    @PutMapping("/{id}/attractions/{attractionId}")
    public Visit updateVisitAttraction(@PathVariable Long id, @PathVariable Long attractionId, @RequestBody userAttraction userAttraction) {
        return visitService.updateVisitAttraction(id, attractionId, userAttraction);
    }

    // Delete a visit's individual attraction
    @DeleteMapping("/{id}/attractions/{attractionId}")
    public Visit deleteVisitAttraction(@PathVariable Long id, @PathVariable Long attractionId) {
        return visitService.deleteVisitAttraction(id, attractionId);
    }

    // Delete a visit
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return ResponseEntity.noContent().build();
    }

    // Get all attractions for a visit
    @GetMapping("/{visitId}/attractions")
    public List<userAttraction> getVisitAttractions(@PathVariable Long visitId) {
        return visitService.getVisitAttractions(visitId);
    }

    // Add an attraction to a visit
    @PostMapping("/{visitId}/attractions")
    public ResponseEntity<Visit.userAttraction> addAttractionToVisit(@PathVariable Long visitId, @RequestBody Visit.userAttraction userAttraction) {
        Visit.userAttraction attractionToAdd = visitService.addAttractionToVisit(visitId, userAttraction);
        return ResponseEntity.status(HttpStatus.CREATED).body(attractionToAdd);
    }
}
