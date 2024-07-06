package com.brianvenegas.tp.client;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import com.brianvenegas.tp.model.Attraction;
import com.brianvenegas.tp.model.Park;
import com.brianvenegas.tp.model.Park.IndividualPark;
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
        // System.out.println("Response JSON: " + responseBody);  // Print the response JSON
        return responseBody;
    }

    public static String getAttraction(String parkId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1//entity/" + parkId + "/live"))
                .build();

        // System.out.print("Request URI: " + request.uri() + "\n");


        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();
        // PrintWriter out = new PrintWriter("DLJSON.txt");
        // System.out.println("Response JSON: " + responseBody);  // Print the response JSON
        // out.println(responseBody);

        return responseBody;
    }

    public static List<Park> parseParks(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ParkWrapper wrapper = objectMapper.readValue(json, ParkWrapper.class);
        // System.out.println("Deserialized Response: " + wrapper);
        return wrapper.getParks();
    }

    public static List<Attraction> parseAttractions(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        IndividualPark park = objectMapper.readValue(json, Park.IndividualPark.class);
        return park.getAttraction();
    }
}
