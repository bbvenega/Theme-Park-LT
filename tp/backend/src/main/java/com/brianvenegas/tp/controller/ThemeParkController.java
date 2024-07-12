package com.brianvenegas.tp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.service.ThemeParkService;


@RestController
public class ThemeParkController {

    @Autowired
    private ThemeParkService themeParkService;

    @GetMapping("/parks")
    public List<Park> getParks() {
        return themeParkService.getParks();
    }



}
