package com.valorant.valorantProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@SpringBootApplication
@EntityScan("com.valorant.valorantProject.entities")
public class ValorantProjectApplication {

	public static void main(String[] args) {
		SpringApplication.run(ValorantProjectApplication.class, args);
	}

}
