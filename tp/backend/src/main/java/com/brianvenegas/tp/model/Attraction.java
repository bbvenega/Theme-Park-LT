// The Attraction Object: The Attraction object represents an attraction in a theme park. 
// It contains information such as the attraction's name, type, status, and last updated time. 
// It also contains information about the attraction's queue, showtimes, operating hours, and dining availability. 
// The Attraction object is part of the model package in the application.
package com.brianvenegas.tp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;

// The Attraction object represents an attraction in a theme park.
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

    // Every attraction belongs to an individual park. Many attractions can belong to the same individual park.
    @ManyToOne
    @JoinColumn(name = "individual_park_id")
    @JsonBackReference
    private IndividualPark individualPark;

    // Every attraction has a queue, which contains information about the attraction's wait times and boarding groups.
    // Every attraction has one queue.
    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonProperty("queue")
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Queue queue;

    // Every attraction has a list of showtimes, which contains information about the attraction's showtimes.
    // Every attraction can have many showtimes.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonProperty("showtimes")
    @JsonManagedReference
    private List<Showtime> showtimes = new ArrayList<>();

    // Every attraction has a list of operating hours, which contains information about the attraction's operating hours.
    // Every attraction can have many operating hours.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonProperty("operatingHours")
    @JsonManagedReference
    private List<OperatingHour> operatingHours = new ArrayList<>();

    // Every attraction has a list of dining availability, which contains information about the attraction's dining availability.
    // Every attraction can have many dining availability.
    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonProperty("diningAvailability")
    @JsonManagedReference
    private List<DiningAvailability> diningAvailability = new ArrayList<>();

    // Getters and setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
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

    public String getParkID() {
        return this.parkId;
    }

    public void setParkID(String parkId) {
        this.parkId = parkId;
    }

    public String getExternalId() {
        return externalId;
    }

    public void setExternalId(String externalId) {
        this.externalId = externalId;
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

    public IndividualPark getIndividualPark() {
        return individualPark;
    }

    public void setIndividualPark(IndividualPark individualPark) {
        this.individualPark = individualPark;
    }

    @Override
    public String toString() {
        return "Attraction{"
                + "id='" + id + '\''
                + ", name='" + name + '\''
                + ", entityType='" + entityType + '\''
                + ", parkId='" + parkId + '\''
                + ", externalId='" + externalId + '\''
                + ", status='" + status + '\''
                + ", lastUpdated='" + lastUpdated + '\''
                + ", queue=" + queue
                + ", showtimes=" + showtimes
                + ", operatingHours=" + operatingHours
                + ", diningAvailability=" + diningAvailability
                + '}';
    }

    // The Queue object represents the queue of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public static class Queue {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        // The queue can have different types of wait times, such as standby, single rider, return time, paid return time, boarding group, and paid standby.
        @JsonProperty("STANDBY")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private Standby standby;

        @JsonProperty("SINGLE_RIDER")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private SingleRider singleRider;

        @JsonProperty("RETURN_TIME")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private ReturnTime returnTime;

        @JsonProperty("PAID_RETURN_TIME")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private PaidReturnTime paidReturnTime;

        @JsonProperty("BOARDING_GROUP")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        private BoardingGroup boardingGroup;

        @JsonProperty("PAID_STANDBY")
        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
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

    // Standby object represents the standby wait time of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    // SingleRider object represents the single rider wait time of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    // ReturnTime object represents the return time of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    // PaidReturnTime object represents the paid return time of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public static class PaidReturnTime {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String state;
        private String returnStart;
        private String returnEnd;
        

        @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
        @JsonIgnoreProperties(value = {"hibernateLazyInitializer", "handler"})
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
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
        public static class Price {

            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;

            private int amount;
            private String currency;
            private String formatted;

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

            public void setFormatted(String formatted) {
                this.formatted = formatted;
            }

            public String getFormatted() {
                return formatted;
            }
        }
    }

    // BoardingGroup object represents the boarding group of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    // PaidStandby object represents the paid standby of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
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

    // Showtime object represents the showtime of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public static class Showtime {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String type;
        private String startTime;
        private String endTime;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "attraction_id")
        @JsonBackReference
        private Attraction attraction;

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

        public void setAttraction(Attraction attraction) {
            this.attraction = attraction;
        }

        public Attraction getAttraction() {
            return attraction;
        }
    }

    // OperatingHour object represents the operating hours of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public static class OperatingHour {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;
        private String type;
        private String startTime;
        private String endTime;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "attraction_id")
        @JsonBackReference
        private Attraction attraction;

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

        public void setAttraction(Attraction attraction) {
            this.attraction = attraction;
        }

        public Attraction getAttraction() {
            return attraction;
        }
    }

    // DiningAvailability object represents the dining availability of an attraction.
    @Entity
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    public static class DiningAvailability {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private int partySize;
        private int waitTime;

        @ManyToOne(fetch = FetchType.LAZY)
        @JoinColumn(name = "attraction_id")
        @JsonBackReference
        private Attraction attraction;

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

        public void setAttraction(Attraction attraction) {
            this.attraction = attraction;
        }

        public Attraction getAttraction() {
            return attraction;
        }
    }
}
