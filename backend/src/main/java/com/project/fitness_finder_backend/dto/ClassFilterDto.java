package com.project.fitness_finder_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ClassFilterDto {
	
	private String type;
	private int price;
	private String location;

}
