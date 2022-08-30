package com.stackroute.pollutioncheck.wishlist;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class WishlistApplication {
	
	
	public static void main(String[] args) {
		SpringApplication.run(WishlistApplication.class, args);
	}


}
