package com.project.fitness_finder_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.project.fitness_finder_backend.entity.Gym;

public interface GymRepository extends JpaRepository<Gym, Long> {
	// Custom query methods (Spring Data JPA auto-implements!)
    List<Gym> findByLocationIgnoreCase(String location);
    
    Optional<Gym> findByNameIgnoreCase(String name);
    
    @Query("SELECT DISTINCT g FROM Gym g " +
            "LEFT JOIN FETCH g.classes gc ")
     List<Gym> findAllWithClassCount();
}
