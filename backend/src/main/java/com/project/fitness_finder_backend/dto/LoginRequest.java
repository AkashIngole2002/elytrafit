package com.project.fitness_finder_backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequest {
	
	@Email(message = "Email Should be Valid")
	@NotBlank(message = "Email is Required")
	private String email;
	
	@NotBlank(message = "Password is Required")
	private String password;
}
