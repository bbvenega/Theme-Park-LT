package com.brianvenegas.tp.client;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.model.ParkWrapper;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ThemeParkApiClient {

    public static String getDestinations() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1/destinations"))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();
        System.out.println("Response JSON: " + responseBody);  // Print the response JSON
        return responseBody;
    }

    public static Attraction getAttraction(String parkId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1//entity/" + parkId + "/live"))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        ObjectMapper objectMapper = new ObjectMapper();
        return objectMapper.readValue(response.body(), Attraction.class);
    }

    public static List<Park> parseParks(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ParkWrapper wrapper = objectMapper.readValue(json, ParkWrapper.class);
        // System.out.println("Deserialized Response: " + wrapper);
        return wrapper.getParks();
    }

    public static void parseAttractions(String json, List<Park> parks) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        List<Park> attractions = objectMapper.readValue(json, List.class);
        // System.out.println("Deserialized Response: " + attractions);
        parks.addAll(attractions);
    }
}
