package com.brianvenegas.tp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.service.ThemeParkService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class ThemeParkController {

    @Autowired
    private ThemeParkService themeParkService;

    @GetMapping("/parks")
    public List<Park> getParks() {
        return themeParkService.getParks();
    }

    @GetMapping("/parks/{parkId}/attractions")
    public List<Attraction> getAttractions(@PathVariable String parkId) {
        return themeParkService.getAttractions(parkId);
    }

}
