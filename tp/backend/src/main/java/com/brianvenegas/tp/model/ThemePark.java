package com.brianvenegas.tp.model;

import java.util.ArrayList;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class ThemePark {

    @Id
    private String id;
    private String name;
    private String slug;
    private ArrayList<Attractions> Attractions;
    private ArrayList<Park> Parks;

    public ThemePark() {
    }

    public ThemePark(String id, String name, ArrayList<Attractions> Attractions) {
        this.id = id;
        this.name = name;
        this.Attractions = Attractions;
    }

    public String getId() {
        return id;
    }

    public void setId(String newId) {
        this.id = newId;
    }

    public String getName() {
        return name;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    @Override
    public String toString() {
        return "ThemePark [id=" + id + ", name=" + name + ", Attractions=" + Attractions + "]";
    }

}

@JsonIgnoreProperties(ignoreUnknown = true)
public static class Park {
    private String id;
    private String name;

    public String getId() {
        return id;
    }

    public void setId(String newId) {
        this.id = newId;
    }
jlkjkl
 this o
}
