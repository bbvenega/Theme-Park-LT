package com.brianvenegas.tp;

import java.io.IOException;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.brianvenegas.tp.client.ThemeParkApiClient; // Add this import statement

@SpringBootApplication
public class TpApplication {

	public static void main(String[] args) {
		SpringApplication.run(TpApplication.class, args);


		try {
			String response = ThemeParkApiClient.getDestinations();
			System.out.println(response);
		} catch (IOException | InterruptedException e) {
			e.printStackTrace();
	}

	

}
}
