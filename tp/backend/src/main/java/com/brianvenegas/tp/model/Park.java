package com.brianvenegas.tp.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties(ignoreUnknown = true)
public class Park {

    @Id
    private String id;
    private String name;
    private String slug;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonProperty("parks")
    private List<IndividualPark> parks;

    public Park() {
    }

    public Park(String id, String name, String slug, List<IndividualPark> parks) {
        this.id = id;
        this.name = name;
        this.parks = parks;
        this.slug = slug;
    }

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

    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    public List<IndividualPark> getParks() {
        return parks;
    }

    public void setParks(List<IndividualPark> parks) {
        this.parks = parks;
    }

    @Override
    public String toString() {
        return "ThemePark{id='" + id + "', name='" + name + "', slug='" + slug + "', parks=" + parks + "}";
    }

    @Entity
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class IndividualPark {

        @Id
        private String id;
        private String name;
        private String slug;
        private List<Attraction> rides;

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

        public void setSlug(String slug) {
            this.slug = slug;
        }

        public String getSlug() {
            return slug;
        }

        public void setAttraction(List<Attraction> rides) {
            this.rides = rides;
        }

        public List<Attraction> getAttraction() {
            return rides;
        }

        @Override
        public String toString() {
            return String.format("IndividualPark{id='%s', name='%s', slug='%s'\n %s's Rides: %s", id, name, slug, name, rides);
        }
    }
}
