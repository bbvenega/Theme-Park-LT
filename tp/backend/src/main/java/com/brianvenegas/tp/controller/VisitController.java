package com.brianvenegas.tp.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    @GetMapping
    public ResponseEntity<List<Visit>> getAllVisit() {
        System.out.println("Getting all visits");
        List<Visit> visits = visitService.getAllVisit();
        return new ResponseEntity<>(visits, HttpStatus.OK);
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
    public ResponseEntity<Void> deleteVisit(@PathVariable Long id) {
        visitService.deleteVisit(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{visitId}/attractions")
    public List<userAttraction> getVisitAttractions(@PathVariable Long visitId) {
        return visitService.getVisitAttractions(visitId);
    }
    

    @PostMapping("/{visitId}/attractions")
    public ResponseEntity<Visit.userAttraction> addAttractionToVisit(@PathVariable Long visitId, @RequestBody Visit.userAttraction userAttraction) {
        Visit.userAttraction attractionToAdd = visitService.addAttractionToVisit(visitId, userAttraction);
        return ResponseEntity.status(HttpStatus.CREATED).body(attractionToAdd);
    }
}
