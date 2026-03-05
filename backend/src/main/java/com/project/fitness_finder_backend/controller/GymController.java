package com.project.fitness_finder_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.fitness_finder_backend.dto.GymClassDto;
import com.project.fitness_finder_backend.dto.GymDto;
import com.project.fitness_finder_backend.entity.Gym;
import com.project.fitness_finder_backend.services.GymClassService;
import com.project.fitness_finder_backend.services.GymService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gyms")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GymController {
	
	private final GymService gymService;
	private final GymClassService classService;
	
	@GetMapping
	public ResponseEntity<List<GymDto>> getAllGyms(){
		List<GymDto> gyms = gymService.getAllGyms();
		return ResponseEntity.ok(gyms);
	}
	
	@PostMapping
	public ResponseEntity<GymDto> createGym(@RequestBody GymDto dto){
		GymDto createdGym  = gymService.createGym(dto);
		return ResponseEntity.ok(createdGym);
	}
	
	@PostMapping("/existing")
	public ResponseEntity<String> sampleGyms(){
		gymService.sampleGyms();
		return ResponseEntity.ok("Sample Gyms Added");
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<GymDto> getGymById(@PathVariable Long id){
		GymDto dto = gymService.getGymById(id);
		return ResponseEntity.ok(dto);
	}
	
	@GetMapping("/city/{city}")
	public ResponseEntity<List<GymDto>> getGymByCity(@PathVariable String city){
		List<GymDto> dtos = gymService.getGymByCity(city);
		return ResponseEntity.ok(dtos);
	}
	
	@GetMapping("/class-count")
	public ResponseEntity<List<GymDto>> getByClassCount(){
		List<GymDto> dtos = gymService.getGymByClassCount();
		return ResponseEntity.ok(dtos);
	}
	
	@GetMapping("name/{name}")
	public ResponseEntity<List<GymDto>> getByName(@PathVariable String name){
		List<GymDto> dtos = gymService.getGymByName(name);
		return ResponseEntity.ok(dtos);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<GymDto> deleteGymById(@PathVariable Long id){
		gymService.deleteGymById(id);
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping
	public ResponseEntity<GymDto> deleteAllGym(){
		gymService.deleteAllGyms();
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<GymDto> updateGym(@PathVariable Long id, @RequestBody GymDto dto){
		return ResponseEntity.ok(gymService.updateGym(id, dto));
	}
	
	@PostMapping("/{gymId}/classes")  // → /api/gyms/14/classes ✅
    public ResponseEntity<GymClassDto> createGymClass(
            @PathVariable Long gymId, 
            @RequestBody GymClassDto gymClassDto) {
        
        System.out.println("✅ HIT! gymId: " + gymId + ", Class: " + gymClassDto.getName());
        
        GymClassDto created = classService.createGymClass(gymId, gymClassDto);
        System.out.println("✅ SAVED! New ID: " + created.getId());
        
        return ResponseEntity.ok(created);
    }

}
