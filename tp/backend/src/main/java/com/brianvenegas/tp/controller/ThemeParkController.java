package com.brianvenegas.tp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.service.ThemeParkService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/parks")
public class ThemeParkController {

    @Autowired
    private ThemeParkService themeParkService;

    @GetMapping
    public List<Park> getParks() {
        return themeParkService.getParks();
    }

    
    @GetMapping("/{parkId}")
    public ResponseEntity<Park> getParkById(@PathVariable String parkId) {
        
        Park park = themeParkService.getParkByID(parkId);
        if (park != null) {
            return new ResponseEntity<>(park, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/attractions")
    public ResponseEntity<List<Attraction>> getAttractions() {
        try {
            List<Attraction> attractions = themeParkService.getAttractions();
            return new ResponseEntity<>(attractions, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{parkId}/attractions")
    public ResponseEntity<List<Attraction>> getAttractionsByIndividualParkId(@PathVariable String parkId) {
        try {
            List<Attraction> attractions = themeParkService.getAttractionsByIndividualParkId(parkId);
            return new ResponseEntity<>(attractions, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
