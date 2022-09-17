package com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class PRSBackend {

	public static void main(String[] args) {
		SpringApplication.run(PRSBackend.class, args);
	}

}
