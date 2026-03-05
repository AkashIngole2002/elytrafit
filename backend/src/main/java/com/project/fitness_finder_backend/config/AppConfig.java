package com.project.fitness_finder_backend.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.project.fitness_finder_backend.dto.GymDto;
import com.project.fitness_finder_backend.entity.Gym;

@Configuration
public class AppConfig {
	@Bean
	public ModelMapper mapper() {
		ModelMapper modelMapper = new ModelMapper();
        modelMapper.typeMap(Gym.class, GymDto.class).addMappings(mapping -> {
            mapping.map(src -> src.getClasses() != null ? src.getClasses().size() : 0L,
                       GymDto::setCount);
        });
		return modelMapper;
	}
}
