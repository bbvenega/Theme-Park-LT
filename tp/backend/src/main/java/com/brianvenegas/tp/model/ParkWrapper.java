// ParkWrapper: This class is a model class that represents the JSON response from the ThemeParks.wiki API.

package com.brianvenegas.tp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class ParkWrapper {

    @JsonProperty("destinations")
    private List<Park> parks;

    public List<Park> getParks() {
        return parks;
    }

    public void setParks(List<Park> parks) {
        this.parks = parks;
    }

    @Override
    public String toString() {
        return "ParkWrapper{"
                + "parks=" + parks
                + '}';
    }
}
