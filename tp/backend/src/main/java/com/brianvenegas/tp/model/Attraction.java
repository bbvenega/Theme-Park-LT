package com.brianvenegas.tp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Attraction {

    @Id
    private Long rideId;
    private String rideName;
    private int standByTime;
    private boolean status;

    public Attraction() {
    }

    public Attraction(Long rideId, String rideName, int standByTime, boolean status) {
        this.rideId = rideId;
        this.rideName = rideName;
        this.standByTime = standByTime;
        this.status = status;
    }

    public Long getRideId() {
        return rideId;
    }

    public void setRideId(Long newRideId) {
        this.rideId = newRideId;
    }

    public String getRideName() {
        return rideName;
    }

    public void setRideName(String newRideName) {
        this.rideName = newRideName;
    }

    public int getStandByTime() {
        return standByTime;
    }

    public void setStandByTime(int newStandByTime) {
        this.standByTime = newStandByTime;
    }

    public boolean getStatus() {
        return status;
    }

    public void setStatus(boolean newStatus) {
        this.status = newStatus;
    }
}
