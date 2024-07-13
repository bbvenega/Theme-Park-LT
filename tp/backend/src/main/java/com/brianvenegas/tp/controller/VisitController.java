package com.brianvenegas.tp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Visit;
import com.brianvenegas.tp.service.VisitService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/visits")
public class VisitController {
    
    @Autowired
    private VisitService visitService;

    @GetMapping
    public List<Visit> getAllVisit() {
        return visitService.getAllVisit();
    }

    @GetMapping("/{id}") // Get a visit by ID
    public Optional<Visit> getVisitById(@PathVariable Long id) {
        return visitService.getVisitById(id);
    }

    @GetMapping("/user/{id}") // Get all visits by patient ID
    public List<Visit> getVisitsByUserId(@PathVariable String id) {
        return visitService.getVisitsByUserId(id);
    }

    @PostMapping
    public Visit createVisit(@RequestBody Visit visit) {
        if(visit.getUserAttractions() == null) {
            visit.setUserAttractions(new ArrayList<>());
        }
        return visitService.createVisit(visit);
    } 

    @PutMapping("/{id}")
    public Visit updateVisit(@PathVariable Long id, @RequestBody Visit visitDetails) {
        return visitService.updateVisit(id, visitDetails);
    }

    @DeleteMapping("/{id}")
    public void deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
    }

    @PostMapping("/{visitId}/attractions")
    public ResponseEntity<Attraction> addAttractionToVisit(@PathVariable Long visitId, @RequestBody Attraction attraction) {
        Attraction attractionToAdd = visitService.addAttractionToVisit(visitId, attraction);
        return ResponseEntity.status(HttpStatus.CREATED).body(attractionToAdd);
    }
}
