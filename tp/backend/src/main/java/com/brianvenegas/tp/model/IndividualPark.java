package com.brianvenegas.tp.model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class IndividualPark {

        @Id
        private String id;
        private String name;
        private String slug;

        
        @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "individualPark")
        @JsonManagedReference
        @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
        private List<Attraction> attractions= new ArrayList<>();

        @ManyToOne
        // @JsonIgnoreProperties("parks")
        @JsonBackReference
        @JoinColumn(name = "park_id")
        private Park park;

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

        public void setAttractions(List<Attraction> rides) {
            this.attractions = rides;
        }

        public List<Attraction> getAttractions() {
            return attractions;
        }

        public void setPark(Park park) {
            this.park = park;
        }

        public Park getPark() {
            return park;
        }

        @Override
        public String toString() {
            return String.format("IndividualPark{id='%s', name='%s', slug='%s'\n %s's Rides: %s", id, name, slug, name, attractions);
        }
    }

