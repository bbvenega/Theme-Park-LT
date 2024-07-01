package com.brianvenegas.tp.client;

import java.io.IOException;
import java.io.PrintWriter;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

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
        // System.out.println("Response JSON: " + responseBody);  // Print the response JSON
        return responseBody;
    }

    public static void getAttraction(String parkId) throws IOException, InterruptedException {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create("https://api.themeparks.wiki/v1//entity/" + parkId + "/live"))
                .build();

        // System.out.print("Request URI: " + request.uri() + "\n");


        HttpResponse<String> response = client.send(request,
                HttpResponse.BodyHandlers.ofString());

        String responseBody = response.body();
        PrintWriter out = new PrintWriter("DLJSON.txt");
        // System.out.println("Response JSON: " + responseBody);  // Print the response JSON
        out.println(responseBody);
    }

    public static List<Park> parseParks(String json) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();
        ParkWrapper wrapper = objectMapper.readValue(json, ParkWrapper.class);
        // System.out.println("Deserialized Response: " + wrapper);
        return wrapper.getParks();
    }

    // public static void parseAttractions(String json, List<Park> parks) throws IOException {
    //     ObjectMapper objectMapper = new ObjectMapper();
    //     List<Park> attractions = objectMapper.readValue(json, List.class);
    //     // System.out.println("Deserialized Response: " + attractions);
    //     parks.addAll(attractions);
    // }
}
