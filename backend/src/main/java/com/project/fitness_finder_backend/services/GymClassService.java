package com.project.fitness_finder_backend.services;

import java.util.List;

import com.project.fitness_finder_backend.dto.ClassFilterDto;
import com.project.fitness_finder_backend.dto.GymClassDto;

public interface GymClassService {
	
//	Update Class Filter Dto
	List<GymClassDto> filterClass(ClassFilterDto filter);
	
	List<GymClassDto> getAllClasses();
	
	List<GymClassDto> getClassesByGym(Long gymId);
	
	List<GymClassDto> getClassesByType(String type);
	
	GymClassDto createGymClass(long gymId, GymClassDto classDto);
	
	void gymSampleClasses();
	
	GymClassDto updateClass(Long gymId, GymClassDto classDto);
	
	void deleteGymClassById(Long id);
	
	void deleteAllGymClass();
	
	GymClassDto updateGymId(Long id, Long gymId);
}
