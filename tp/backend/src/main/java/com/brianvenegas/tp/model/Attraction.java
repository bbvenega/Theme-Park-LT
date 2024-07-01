package com.brianvenegas.tp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

@JsonIgnoreProperties(ignoreUnknown = true)
@Entity
public class Attraction {

    @Id
    private String id;
    private String name;
    private String entityType;
    private String parkId;
    private String externalId;
    private String status;
    private String lastUpdated;

    @OneToOne(cascade = CascadeType.ALL)
    @JsonProperty("queue")
    private Queue queue;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonProperty("showtimes")
    private List<Showtime> showtimes;

    @ElementCollection
    private List<OperatingHour> operatingHours;

    @ElementCollection
    private List<DiningAvailability> diningAvailability;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getLastUpdated() {
        return lastUpdated;
    }

    public void setLastUpdated(String lastUpdated) {
        this.lastUpdated = lastUpdated;
    }

    public Queue getQueue() {
        return queue;
    }

    public void setQueue(Queue queue) {
        this.queue = queue;
    }

    public List<Showtime> getShowtimes() {
        return showtimes;
    }

    public void setShowtimes(List<Showtime> showtimes) {
        this.showtimes = showtimes;
    }

    public List<OperatingHour> getOperatingHours() {
        return operatingHours;
    }

    public void setOperatingHours(List<OperatingHour> operatingHours) {
        this.operatingHours = operatingHours;
    }

    public List<DiningAvailability> getDiningAvailability() {
        return diningAvailability;
    }

    public void setDiningAvailability(List<DiningAvailability> diningAvailability) {
        this.diningAvailability = diningAvailability;
    }
}

@Entity
public static class Queue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(cascade = CascadeType.ALL)
    private Standby standby;

    @OneToOne(cascade = CascadeType.ALL)
    private SingleRider singleRider;

    @OneToOne(cascade = CascadeType.ALL)
    private ReturnTime returnTime;

    @OneToOne(cascade = CascadeType.ALL)
    private PaidReturnTime paidReturnTime;

    @OneToOne(cascade = CascadeType.ALL)
    private BoardingGroup boardingGroup;

    @OneToOne(cascade = CascadeType.ALL)
    private PaidStandby paidStandby;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Standby getStandby() {
        return standby;
    }

    public void setStandby(Standby standby) {
        this.standby = standby;
    }

    public SingleRider getSingleRider() {
        return singleRider;
    }

    public void setSingleRider(SingleRider singleRider) {
        this.singleRider = singleRider;
    }

    public ReturnTime getReturnTime() {
        return returnTime;
    }

    public void setReturnTime(ReturnTime returnTime) {
        this.returnTime = returnTime;
    }

    public PaidReturnTime getPaidReturnTime() {
        return paidReturnTime;
    }

    public void setPaidReturnTime(PaidReturnTime paidReturnTime) {
        this.paidReturnTime = paidReturnTime;
    }

    public BoardingGroup getBoardingGroup() {
        return boardingGroup;
    }

    public void setBoardingGroup(BoardingGroup boardingGroup) {
        this.boardingGroup = boardingGroup;
    }

    public PaidStandby getPaidStandby() {
        return paidStandby;
    }

    public void setPaidStandby(PaidStandby paidStandby) {
        this.paidStandby = paidStandby;
    }
}

@Entity
public static class Standby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int waitTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }
}

@Entity
public static class SingleRider {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int waitTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }
}

@Entity
public static class ReturnTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;
    private String returnStart;
    private String returnEnd;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getReturnStart() {
        return returnStart;
    }

    public void setReturnStart(String returnStart) {
        this.returnStart = returnStart;
    }

    public String getReturnEnd() {
        return returnEnd;
    }

    public void setReturnEnd(String returnEnd) {
        this.returnEnd = returnEnd;
    }
}

@Entity
public static class PaidReturnTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String state;
    private String returnStart;
    private String returnEnd;

    @OneToOne(cascade = CascadeType.ALL)
    private Price price;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getReturnStart() {
        return returnStart;
    }

    public void setReturnStart(String returnStart) {
        this.returnStart = returnStart;
    }

    public String getReturnEnd() {
        return returnEnd;
    }

    public void setReturnEnd(String returnEnd) {
        this.returnEnd = returnEnd;
    }

    public Price getPrice() {
        return price;
    }

    public void setPrice(Price price) {
        this.price = price;
    }

    @Entity
    public static class Price {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private int amount;
        private String currency;

        // Getters and setters
        public Long getId() {
            return id;
        }

        public void setId(Long id) {
            this.id = id;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }
    }
}

@Entity
public static class BoardingGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String allocationStatus;
    private int currentGroupStart;
    private int currentGroupEnd;
    private String nextAllocationTime;
    private int estimatedWait;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAllocationStatus() {
        return allocationStatus;
    }

    public void setAllocationStatus(String allocationStatus) {
        this.allocationStatus = allocationStatus;
    }

    public int getCurrentGroupStart() {
        return currentGroupStart;
    }

    public void setCurrentGroupStart(int currentGroupStart) {
        this.currentGroupStart = currentGroupStart;
    }

    public int getCurrentGroupEnd() {
        return currentGroupEnd;
    }

    public void setCurrentGroupEnd(int currentGroupEnd) {
        this.currentGroupEnd = currentGroupEnd;
    }

    public String getNextAllocationTime() {
        return nextAllocationTime;
    }

    public void setNextAllocationTime(String nextAllocationTime) {
        this.nextAllocationTime = nextAllocationTime;
    }

    public int getEstimatedWait() {
        return estimatedWait;
    }

    public void setEstimatedWait(int estimatedWait) {
        this.estimatedWait = estimatedWait;
    }
}

@Entity
public static class PaidStandby {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int waitTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }
}

@Entity
public static class Showtime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String startTime;
    private String endTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}

@Entity
public static class OperatingHour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String type;
    private String startTime;
    private String endTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getStartTime() {
        return startTime;
    }

    public void setStartTime(String startTime) {
        this.startTime = startTime;
    }

    public String getEndTime() {
        return endTime;
    }

    public void setEndTime(String endTime) {
        this.endTime = endTime;
    }
}

@Entity
public static class DiningAvailability {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int partySize;
    private int waitTime;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getPartySize() {
        return partySize;
    }

    public void setPartySize(int partySize) {
        this.partySize = partySize;
    }

    public int getWaitTime() {
        return waitTime;
    }

    public void setWaitTime(int waitTime) {
        this.waitTime = waitTime;
    }
}
}
