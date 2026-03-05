package com.project.fitness_finder_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtDto {

	private String tokan;
	private long userId;
	private String email;
	private String role;
}
