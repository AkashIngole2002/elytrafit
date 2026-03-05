package com.project.fitness_finder_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.project.fitness_finder_backend.entity.GymClass;

@Repository
public interface GymClassRepository extends JpaRepository<GymClass, Long> {
	// Query by single field
    List<GymClass> findByTypeIgnoreCase(String type);
    
    // Query by multiple fields (for ClassFilterRequest)
    List<GymClass> findByTypeIgnoreCaseAndPriceLessThanEqual(String type, int maxPrice);
    
    // Query by gym
    List<GymClass> findByGymId(Long gymId);
    
    // Native SQL query (complex filtering)
    @Query("SELECT gc FROM GymClass gc WHERE " +
           "(:type IS NULL OR UPPER(gc.type) = UPPER(:type)) AND " +
           "(:maxPrice IS NULL OR gc.price <= :maxPrice)")
    List<GymClass> filterClasses(String type, 
                                @Param("maxPrice") Integer maxPrice);

}
