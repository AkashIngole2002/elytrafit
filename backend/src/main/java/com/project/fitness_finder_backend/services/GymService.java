package com.project.fitness_finder_backend.services;

import java.util.List;

import com.project.fitness_finder_backend.dto.GymDto;

public interface GymService {
	
	List<GymDto> getAllGyms();
	
	GymDto getGymById(Long id);
	
	List<GymDto> getGymByCity(String city);
	
	List<GymDto> getGymByClassCount();
	
	List<GymDto> getGymByName(String name);
	
	GymDto createGym(GymDto dto);
	
	void sampleGyms();
	
	void deleteGymById(Long id);
	
	void deleteAllGyms();
	
	GymDto updateGym(Long id, GymDto dto);
}
