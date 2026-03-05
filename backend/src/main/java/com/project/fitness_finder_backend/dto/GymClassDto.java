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
public class GymClassDto {
	
	private long id;
	private String name;
	private String type;
	private String time;
	private int price;
	private String gymName;
}
