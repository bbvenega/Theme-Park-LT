package com.brianvenegas.tp.client;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.model.ParkWrapper;
import com.fasterxml.jackson.databind.ObjectMapper; // Import the ParkWrapper class

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

    public static List<Park> parseParks(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ParkWrapper wrapper = objectMapper.readValue(json, ParkWrapper.class);
        // System.out.println("Deserialized Response: " + wrapper);
        return wrapper.getParks();
    }
}
