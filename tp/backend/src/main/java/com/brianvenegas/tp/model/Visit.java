// Visit: A visit represents a user's visit to a park. 
package com.brianvenegas.tp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Visit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String parkName;
    private String dateVisited;

    // A visit is associated with a park.
    // The visit is the child of the relationship and may belong to only one park.
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "park_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Park park;

    // A visit has a list of userAttractions.
    // The visit is the owner of the relationship and may have many userAttractions.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER, mappedBy = "visit", orphanRemoval = true)
    @JsonManagedReference
    private List<userAttraction> userAttractions = new ArrayList<>();

    // A visit is associated with a user.
    // The visit is the child of the relationship and may belong to only one user.
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonBackReference
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private User user;

    public Visit() {
    }

    public Visit(String parkName, String dateVisited) {
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

    public Park getPark() {
        return park;
    }

    public void setPark(Park newPark) {
        this.park = newPark;
    }

    // UserAttraction: A userAttraction represents an attraction a user rides on a certain visit.
    // It has special attributes specific to the visit / user.
    @Entity
    public static class userAttraction {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // TimeOfDay: The time of day the user rode the attraction.
        private String timeOfDay;

        // ActualWaitTime: The actual wait time the user experienced for the attraction.
        // PostedWaitTime: The posted wait time for the attraction.
        private long actualWaitTime;
        private int postedWaitTime;
        private long breakdownTime;

        private String attractionName;
        private String attractionId;

        // Fastpass: A boolean that represents if the user has a fastpass for the attraction.
        // SingleRider: A boolean that represents if the user is riding the attraction as a single rider.
        // BrokeDown: A boolean that represents if the attraction broke down during the user's visit.
        private boolean fastpass;
        private boolean singleRider;
        private boolean brokeDown;

        // A userAttraction is associated with a visit.
        // The userAttraction is the child of the relationship and may belong to only one visit.
        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "visit_id")
        @JsonBackReference
        private Visit visit;

        public userAttraction() {
            attractionId = "";
            timeOfDay = "";
            actualWaitTime = 0;
            postedWaitTime = 0;
        }

        public userAttraction(String attractionId) {
            this.attractionId = attractionId;
            this.timeOfDay = "CHANGE THIS";
            this.actualWaitTime = 0;
            this.postedWaitTime = 0;
        }

        public Long getId() {
            return id;
        }

        public void setId(Long newId) {
            this.id = newId;
        }

        public String getTimeOfDay() {
            return timeOfDay;
        }

        public void setTimeOfDay(String newTimeOfDay) {
            this.timeOfDay = newTimeOfDay;
        }

        public long getActualWaitTime() {
            return actualWaitTime;
        }

        public void setActualWaitTime(long newActualWaitTime) {
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

        public String getAttractionName() {
            return attractionName;
        }

        public void setAttractionName(String newAttractionName) {
            this.attractionName = newAttractionName;

        }

        public String getAttractionId() {
            return attractionId;
        }

        public void setAttractionId(String newAttractionId) {
            this.attractionId = newAttractionId;
        }

        public boolean isFastpass() {
            return fastpass;
        }

        public void setFastpass(boolean newFastpass) {
            this.fastpass = newFastpass;
        }

        public boolean isSingleRider() {
            return singleRider;
        }

        public void setSingleRider(boolean newSingleRider) {
            this.singleRider = newSingleRider;
        }

        public boolean isBrokeDown() {
            return brokeDown;
        }

        public void setBrokeDown(boolean newBrokeDown) {
            this.brokeDown = newBrokeDown;
        }

        public long getBreakdownTime() {
            return breakdownTime;
        }

        public void setBreakdownTime(long newBreakdownTime) {
            this.breakdownTime = newBreakdownTime;
        }

        @Override
        public String toString() {
            return "\nuserAttraction [actualWaitTime=" + actualWaitTime + ", attractionName=" + attractionName + ", id=" + id
                    + ", postedWaitTime=" + postedWaitTime + ", rideID=" + attractionId + ", timeOfDay=" + timeOfDay + "]";
        }
    }
}
