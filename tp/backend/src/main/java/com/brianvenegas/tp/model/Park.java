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
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Park {

    @Id
    private String id;
    private String name;
    private String slug;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true, mappedBy = "park")
    @JsonProperty("parks")
    @JsonManagedReference
    private List<IndividualPark> parks = new ArrayList<>();

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
        return "ThemePark{id='" + id + "', name='" + name + "', slug='" + slug + "', parks=" + parks + "}\n\n";
    }

}