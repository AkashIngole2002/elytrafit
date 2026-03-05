package com.project.fitness_finder_backend.exceptionHandler;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.project.fitness_finder_backend.dto.ErrorResponseDto;

@RestControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponseDto> handleResourceNotFound(
            ResourceNotFoundException ex, WebRequest request) {
        ErrorResponseDto error = new ErrorResponseDto(
            HttpStatus.NOT_FOUND.value(),
            ex.getMessage(),
            request.getDescription(false),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
	
	@ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponseDto> handleRuntimeException(
            RuntimeException ex, WebRequest request) {
        ErrorResponseDto error = new ErrorResponseDto(
            HttpStatus.BAD_REQUEST.value(),
            ex.getMessage(),
            request.getDescription(false),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }
	
	@ExceptionHandler(MissingPathVariableException.class)
    public ResponseEntity<ErrorResponseDto> handleMissingPathVariable(
            MissingPathVariableException ex, WebRequest request) {
        ErrorResponseDto error = new ErrorResponseDto(
            HttpStatus.BAD_REQUEST.value(),
            "Invalid URL - missing required ID parameter",
            request.getDescription(false),
            LocalDateTime.now()
        );
        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGlobalException(
            Exception ex, WebRequest request) {
        ErrorResponseDto error = new ErrorResponseDto(
            HttpStatus.INTERNAL_SERVER_ERROR.value(),
            "Something went wrong!",
            request.getDescription(false),
            LocalDateTime.now()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }

}
