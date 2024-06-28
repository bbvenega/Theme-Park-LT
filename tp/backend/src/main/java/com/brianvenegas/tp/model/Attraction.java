package com.brianvenegas.tp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Attraction {

    private String id;
    private String name;
    private String entityType;
    private String timezone;

    @JsonProperty("liveData")
    private List<LiveData> liveData;

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

    public String getTimeZone() {
        return timezone;
    }

    public void setTimeZone(String tz) {
        this.timezone = tz;
    }

    public List<LiveData> getLiveData() {
        return liveData;
    }

    public void setLiveData(List<LiveData> liveData) {
        this.liveData = liveData;
    }

    public static class LiveData {

        private String id;
        private String name;
        private String entityType;
        private String status;
        private String lastUpdated;
        private Queue queue;
        private List<Showtime> showtimes;
        private List<OperatingHour> operatingHours;
        private List<DiningAvailability> diningAvailability;

        // Getters and setters
        void setId(String id) {
            this.id = id;
        }

        void setName(String name) {
            this.name = name;
        }

        void setEntityType(String entityType) {
            this.entityType = entityType;
        }

        void setStatus(String status) {
            this.status = status;
        }

        void setLastUpdated(String lastUpdated) {
            this.lastUpdated = lastUpdated;
        }

        void setQueue(Queue queue) {
            this.queue = queue;
        }

        void setShowtimes(List<Showtime> showtimes) {
            this.showtimes = showtimes;
        }

        void setOperatingHours(List<OperatingHour> operatingHours) {
            this.operatingHours = operatingHours;
        }

        void setDiningAvailability(List<DiningAvailability> diningAvailability) {
            this.diningAvailability = diningAvailability;
        }

        String getId() {
            return id;
        }

        String getName() {
            return name;
        }

        String getEntityType() {
            return entityType;
        }

        String getStatus() {
            return status;
        }

        String getLastUpdated() {
            return lastUpdated;
        }

        Queue getQueue() {
            return queue;
        }

        List<Showtime> getShowtimes() {
            return showtimes;
        }

        List<OperatingHour> getOperatingHours() {
            return operatingHours;
        }

        List<DiningAvailability> getDiningAvailability() {
            return diningAvailability;
        }
    }

    public static class Queue {

        private Standby STANDBY;
        private SingleRider SINGLE_RIDER;
        private ReturnTime RETURN_TIME;
        private PaidReturnTime PAID_RETURN_TIME;
        private BoardingGroup BOARDING_GROUP;
        private PaidStandby PAID_STANDBY;

        // Getters and setters
        void setStandby(Standby standby) {
            this.STANDBY = standby;
        }

        void setSingleRider(SingleRider singleRider) {
            this.SINGLE_RIDER = singleRider;
        }

        void setReturnTime(ReturnTime returnTime) {
            this.RETURN_TIME = returnTime;
        }

        void setPaidReturnTime(PaidReturnTime paidReturnTime) {
            this.PAID_RETURN_TIME = paidReturnTime;
        }

        void setBoardingGroup(BoardingGroup boardingGroup) {
            this.BOARDING_GROUP = boardingGroup;
        }

        void setPaidStandby(PaidStandby paidStandby) {
            this.PAID_STANDBY = paidStandby;
        }

        Standby getStandby() {
            return STANDBY;
        }

        SingleRider getSingleRider() {
            return SINGLE_RIDER;
        }

        ReturnTime getReturnTime() {
            return RETURN_TIME;
        }

        PaidReturnTime getPaidReturnTime() {
            return PAID_RETURN_TIME;
        }

        BoardingGroup getBoardingGroup() {
            return BOARDING_GROUP;
        }

        PaidStandby getPaidStandby() {
            return PAID_STANDBY;
        }

    }

    public static class Standby {

        private int waitTime;
        // Getters and setters

        void setWaitTime(int waitTime) {
            this.waitTime = waitTime;
        }

        int getWaitTime() {
            return waitTime;
        }
    }

    public static class SingleRider {

        private int waitTime;
        // Getters and setters

        void setWaitTime(int waitTime) {
            this.waitTime = waitTime;
        }

        int getWaitTime() {
            return waitTime;
        }

    }

    public static class ReturnTime {

        private String state;
        private String returnStart;
        private String returnEnd;
        // Getters and setters

        void setState(String state) {
            this.state = state;
        }

        void setReturnStart(String returnStart) {
            this.returnStart = returnStart;
        }

        void setReturnEnd(String returnEnd) {
            this.returnEnd = returnEnd;
        }

        String getState() {
            return state;
        }

        String getReturnStart() {
            return returnStart;
        }

        String getReturnEnd() {
            return returnEnd;
        }
    }

    public static class PaidReturnTime {

        private String state;
        private String returnStart;
        private String returnEnd;
        private Price price;

        // Getters and setters
        void setState(String state) {
            this.state = state;
        }

        void setReturnStart(String returnStart) {
            this.returnStart = returnStart;
        }

        void setReturnEnd(String returnEnd) {
            this.returnEnd = returnEnd;
        }

        void setPrice(Price price) {
            this.price = price;
        }

        String getState() {
            return state;
        }

        String getReturnStart() {
            return returnStart;
        }

        String getReturnEnd() {
            return returnEnd;
        }

        Price getPrice() {
            return price;
        }

        public static class Price {

            private int amount;
            private String currency;
            // Getters and setters

            void setAmount(int amount) {
                this.amount = amount;
            }

            void setCurrency(String currency) {
                this.currency = currency;
            }

            int getAmount() {
                return amount;
            }

            String getCurrency() {
                return currency;

            }
        }
    }

    public static class BoardingGroup {

        private String allocationStatus;
        private int currentGroupStart;
        private int currentGroupEnd;
        private String nextAllocationTime;
        private int estimatedWait;
        // Getters and setters

        void setAllocationStatus(String allocationStatus) {
            this.allocationStatus = allocationStatus;
        }

        void setCurrentGroupStart(int currentGroupStart) {
            this.currentGroupStart = currentGroupStart;
        }

        void setCurrentGroupEnd(int currentGroupEnd) {
            this.currentGroupEnd = currentGroupEnd;
        }

        void setNextAllocationTime(String nextAllocationTime) {
            this.nextAllocationTime = nextAllocationTime;
        }

        void setEstimatedWait(int estimatedWait) {
            this.estimatedWait = estimatedWait;
        }

        String getAllocationStatus() {
            return allocationStatus;
        }

        int getCurrentGroupStart() {
            return currentGroupStart;
        }

        int getCurrentGroupEnd() {
            return currentGroupEnd;
        }

        String getNextAllocationTime() {
            return nextAllocationTime;
        }

        int getEstimatedWait() {
            return estimatedWait;
        }

    }

    public static class PaidStandby {

        private int waitTime;
        // Getters and setters

        void setWaitTime(int waitTime) {
            this.waitTime = waitTime;
        }

        int getWaitTime() {
            return waitTime;
        }

    }

    public static class Showtime {

        private String type;
        private String startTime;
        private String endTime;
        // Getters and setters

        void setType(String type) {
            this.type = type;
        }

        void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        String getType() {
            return type;
        }

        String getStartTime() {
            return startTime;
        }

        String getEndTime() {
            return endTime;
        }

    }

    public static class OperatingHour {

        private String type;
        private String startTime;
        private String endTime;
        // Getters and setters

        void setType(String type) {
            this.type = type;
        }

        void setStartTime(String startTime) {
            this.startTime = startTime;
        }

        void setEndTime(String endTime) {
            this.endTime = endTime;
        }

        String getType() {
            return type;
        }

        String getStartTime() {
            return startTime;
        }

        String getEndTime() {
            return endTime;
        }

    }

    public static class DiningAvailability {

        private int partySize;
        private int waitTime;
        // Getters and setters

        void setPartySize(int partySize) {
            this.partySize = partySize;
        }

        void setWaitTime(int waitTime) {
            this.waitTime = waitTime;
        }

        int getPartySize() {
            return partySize;
        }

        int getWaitTime() {
            return waitTime;
        }

    }
}
