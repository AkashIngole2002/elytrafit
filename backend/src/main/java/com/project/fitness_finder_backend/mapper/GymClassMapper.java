package com.project.fitness_finder_backend.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.fitness_finder_backend.dto.GymClassDto;
import com.project.fitness_finder_backend.entity.GymClass;

@Component
public class GymClassMapper {
	@Autowired
	private ModelMapper mapper;
	
	public GymClass toEntity(GymClassDto classDto) {
		return mapper.map(classDto, GymClass.class);
	}
	
	public GymClassDto toDto(GymClass gymClass) {
		if(gymClass == null) return null;
		return mapper.map(gymClass, GymClassDto.class);
		
	}
	
	public List<GymClassDto> toDtoList(List<GymClass> gymClasses) {
        if (gymClasses == null || gymClasses.isEmpty()) return new ArrayList<>();
        
        return gymClasses.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
	

}
