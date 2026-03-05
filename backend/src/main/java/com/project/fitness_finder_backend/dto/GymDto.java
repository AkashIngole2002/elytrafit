package com.project.fitness_finder_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GymDto {
	
	private long id;
	private String name;
	private String location;
	private String address;
	private long count;
	private Double rating;
    private String priceRange;
    private String imageUrl;
}
