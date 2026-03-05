package com.project.fitness_finder_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.project.fitness_finder_backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{
	
	// Custom query method - Spring Data JPA auto-generates SQL
    Optional<User> findByEmail(String email);
    
    // Additional useful methods (optional)
    boolean existsByEmail(String email);

}
