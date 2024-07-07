package com.brianvenegas.tp.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String parkName;
    private String dateVisited;


    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "visit")
    private List<userAttraction> userAttractions;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    public Visit() {
        parkName = "";
        dateVisited = "";
        userAttractions = null;
    }

    public Visit( String parkName, String dateVisited) {
        this.parkName = parkName;
        this.dateVisited = dateVisited;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long newId) {
        this.id = newId;
    }

    public String getParkName() {
        return parkName;
    }

    public void setParkName(String newParkName) {
        this.parkName = newParkName;
    }

    public String getDateVisited() {
        return dateVisited;
    }

    public void setDateVisited(String newDateVisited) {
        this.dateVisited = newDateVisited;
    }

    public List<userAttraction> getUserAttractions() {
        return userAttractions;
    }

    public void setUserAttractions(List<userAttraction> newUserAttractions) {
        this.userAttractions = newUserAttractions;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User newUser) {
        this.user = newUser;
    }



@Entity
public static class userAttraction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String timeOfDay;
    private int actualWaitTime;
    private int postedWaitTime;

    @ManyToOne(fetch = FetchType.LAZY)
    private Visit visit;

    @ManyToOne(fetch = FetchType.LAZY)
    private Attraction attraction;

    public userAttraction() {
        attraction = null;
        timeOfDay = "";
        actualWaitTime = 0;
        postedWaitTime = 0;
    }

    public userAttraction(Long id, Attraction attraction, String timeOfDay, int actualWaitTime, int postedWaitTime) {
        this.attraction = attraction;
        this.timeOfDay = timeOfDay;
        this.actualWaitTime = actualWaitTime;
        this.postedWaitTime = attraction.getQueue().getStandby().getWaitTime();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long newId) {
        this.id = newId;
    }

    public Attraction getAttraction() {
        return attraction;
    }

    public void setAttraction(Attraction newAttraction) {
        this.attraction = newAttraction;
    }

    public String getTimeOfDay() {
        return timeOfDay;
    }

    public void setTimeOfDay(String newTimeOfDay) {
        this.timeOfDay = newTimeOfDay;
    }

    public int getActualWaitTime() {
        return actualWaitTime;
    }

    public void setActualWaitTime(int newActualWaitTime) {
        this.actualWaitTime = newActualWaitTime;
    }

    public int getPostedWaitTime() {
        return postedWaitTime;
    }

    public void setPostedWaitTime(int newPostedWaitTime) {
        this.postedWaitTime = newPostedWaitTime;
    }

    public Visit getVisit() {
        return visit;
    }

    public void setVisit(Visit newVisit) {
        this.visit = newVisit;
    }

}
}
