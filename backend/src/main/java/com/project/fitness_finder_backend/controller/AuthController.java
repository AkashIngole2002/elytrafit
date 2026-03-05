package com.project.fitness_finder_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.fitness_finder_backend.dto.JwtDto;
import com.project.fitness_finder_backend.dto.LoginRequest;
import com.project.fitness_finder_backend.entity.User;
import com.project.fitness_finder_backend.services.AuthService;
import com.project.fitness_finder_backend.services.utils.JwtUtil;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
	
	private final AuthService authService;
	private final JwtUtil jwtUtil;
	
	@PostMapping("/register")
	public ResponseEntity<JwtDto> register(@RequestBody LoginRequest request){
		User user = authService.createUser(request.getEmail(), request.getPassword());
		String jwtToken = jwtUtil.generateToken(user.getEmail());
		
		JwtDto dto = new JwtDto(jwtToken, user.getId(), user.getEmail(), user.getRole());
		
		return ResponseEntity.ok(dto);
	}
	
	@PostMapping("/login")
	public ResponseEntity<JwtDto> login(@RequestBody LoginRequest request){
		User user = authService.validateLogin(request.getEmail(), request.getPassword());
		
		String jwtToken = jwtUtil.generateToken(user.getEmail());
		JwtDto dto = new JwtDto(jwtToken, user.getId(), user.getEmail(), user.getRole());
		
		return ResponseEntity.ok(dto);
	}
}
