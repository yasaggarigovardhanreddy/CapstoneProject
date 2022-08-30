package com.stackroute.pollutioncheck.UserAuthetincation;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import com.stackroute.pollutioncheck.UserAuthetincation.util.AuthenticationFiler;


@SpringBootApplication
@EnableEurekaClient
public class UserAuthetincationApplication {

	public static void main(String[] args) {
		SpringApplication.run(UserAuthetincationApplication.class, args);
	}
	
	
	@Bean
	public AuthenticationFiler authenticationFilter(){
		return new AuthenticationFiler();
	}
	
	@Bean
	public FilterRegistrationBean<AuthenticationFiler>registerationFilter(){
		FilterRegistrationBean<AuthenticationFiler>registeration=new FilterRegistrationBean<>();
		registeration.addUrlPatterns("/users/*");
		registeration.setFilter(authenticationFilter());
		return registeration;
	}
	
	
}
