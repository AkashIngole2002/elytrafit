package com.project.fitness_finder_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@EnableJpaRepositories
public class FitnessFinderBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(FitnessFinderBackendApplication.class, args);
    }
}
