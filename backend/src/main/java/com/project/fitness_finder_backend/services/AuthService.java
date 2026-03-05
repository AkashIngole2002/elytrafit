package com.project.fitness_finder_backend.services;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.project.fitness_finder_backend.entity.User;
import com.project.fitness_finder_backend.exceptionHandler.ResourceNotFoundException;
import com.project.fitness_finder_backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
	
	private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public User createUser(String email, String rawPassword) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new ResourceNotFoundException("User already exists: " + email);
        }
        
        String hashedPassword = passwordEncoder.encode(rawPassword);
        User user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);
        if (email.equals("fitnessfinderadmin@gmail.com")) {
            user.setRole("ADMIN");
        } else {
            user.setRole("USER");
        }
        
        return userRepository.save(user);
    }
    
    public User validateLogin(String email, String rawPassword) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new ResourceNotFoundException("User not found: " + email));
        
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new ResourceNotFoundException("Invalid password");
        }
        
        return user;
    }
}
