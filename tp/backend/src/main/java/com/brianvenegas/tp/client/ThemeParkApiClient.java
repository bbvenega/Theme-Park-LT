// ThemeParkApiClient class is a collection of static methods that make HTTP requests to the ThemeParks.wiki API and parse the JSON responses into Java objects.
package com.brianvenegas.tp.client;


// The following imports are needed to make HTTP requests and parse JSON responses.
import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.model.ParkWrapper;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

public class ThemeParkApiClient {

    // This method makes an HTTP GET request to the ThemeParks.wiki API to get a list of all theme parks.
    public static String getDestinations() throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1/destinations"))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();
        return responseBody;
    }

    // This method makes an HTTP GET request to the ThemeParks.wiki API to get a list of all attractions at a specific theme park.
    public static String getAttraction(String parkId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1//entity/" + parkId + "/live"))
                .build();

        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();

        return responseBody;
    }

    // This method parses the JSON response from the ThemeParks.wiki API into a list of Park objects.
    public static List<Park> parseParks(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ParkWrapper wrapper = objectMapper.readValue(json, ParkWrapper.class);
        // System.out.println("Deserialized Response: " + wrapper);
        return wrapper.getParks();
    }

    // This method parses the JSON response from the ThemeParks.wiki API into a list of Attraction objects.
    public static List<Attraction> parseAttractions(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode root = objectMapper.readTree(json);
        JsonNode liveDataNode = root.path("liveData");

        List<Attraction> attractions = new ArrayList<>();
        if (liveDataNode.isArray()) {
            for (JsonNode node : liveDataNode) {
                Attraction attraction = objectMapper.treeToValue(node, Attraction.class);
                attractions.add(attraction);
            }
        }
        return attractions;
    }
}
