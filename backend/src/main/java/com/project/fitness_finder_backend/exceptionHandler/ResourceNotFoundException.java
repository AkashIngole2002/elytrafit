package com.project.fitness_finder_backend.exceptionHandler;

public class ResourceNotFoundException extends RuntimeException {
	
	public ResourceNotFoundException(String message) {
		super(message);
	}
}
