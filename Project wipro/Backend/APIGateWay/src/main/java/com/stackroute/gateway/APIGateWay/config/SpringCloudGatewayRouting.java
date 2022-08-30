package com.stackroute.gateway.APIGateWay.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SpringCloudGatewayRouting {


    @Bean
    public RouteLocator configureRoute(RouteLocatorBuilder builder) {
       return builder.routes()
      .route("WishListService", r->r.path("/api/v1/fav/**").uri("http://localhost:8089")) //static routing
      .route("UserAuthService", r->r.path("/api/v1/auth/**").uri("http://localhost:8084")) //dynamic routing
      .build();
    }
}
