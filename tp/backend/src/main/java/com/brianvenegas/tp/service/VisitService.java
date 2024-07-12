package com.brianvenegas.tp.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brianvenegas.tp.model.Visit;
import com.brianvenegas.tp.repository.VisitRepository;

@Service
public class VisitService {

    @Autowired
    private VisitRepository visitRepository;

    public List<Visit> getAllVisit() {
        return visitRepository.findAll();
    }

    public Visit createVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    public Visit updateVisit(String id, Visit visitDetails) {
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

    public Optional<Visit> getVisitById(String id) {
        return visitRepository.findById(id);
    }

    public List<Visit> getVisitsByUserId(String id) {
        return visitRepository.findByUserId(id);
    }

    public Visit saveVisit(Visit visit) {
        return visitRepository.save(visit);
    }

    public void deleteVisit(String id) {
        visitRepository.deleteById(id);
    }
}
