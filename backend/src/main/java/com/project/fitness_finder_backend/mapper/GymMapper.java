package com.project.fitness_finder_backend.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.project.fitness_finder_backend.dto.GymDto;
import com.project.fitness_finder_backend.entity.Gym;

@Component
public class GymMapper {
	@Autowired
	private ModelMapper mapper;
	
	public Gym toEntity(GymDto dto) {
		return mapper.map(dto, Gym.class);
	}
	
	public GymDto toDto(Gym gym) {
	    if (gym == null) return null;

	    GymDto dto = new GymDto();
	    dto.setId((int) gym.getId());  // long → int
	    dto.setName(gym.getName());
	    dto.setLocation(gym.getLocation());
	    dto.setAddress(gym.getAddress());           
        dto.setRating(gym.getRating());               
        dto.setPriceRange(gym.getPriceRange());     
        dto.setImageUrl(gym.getImageUrl());  
	    dto.setCount(gym.getClasses() != null ? gym.getClasses().size() : 0);
	    
	    return dto;
	}
	
	public List<GymDto> toDtoList(List<Gym> gyms){
		if (gyms == null || gyms.isEmpty()) return new ArrayList<>();
        
        return gyms.stream()
                .map(this::toDto)
                .collect(Collectors.toList());

	}

}
