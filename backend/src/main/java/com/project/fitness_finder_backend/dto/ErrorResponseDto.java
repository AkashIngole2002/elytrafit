package com.project.fitness_finder_backend.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponseDto {
	private int status;
    private String message;
    private String path;
    private LocalDateTime timestamp;
    
    public ErrorResponseDto(int status, String message, String path, LocalDateTime timestamp) {
        this.status = status;
        this.message = message;
        this.path = path;
        this.timestamp = timestamp;
    }
}
