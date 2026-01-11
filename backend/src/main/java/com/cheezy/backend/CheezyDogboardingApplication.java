package com.cheezy.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class CheezyDogboardingApplication {

	public static void main(String[] args) {



        SpringApplication.run(CheezyDogboardingApplication.class, args);
	}

}
