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

import com.project.fitness_finder_backend.dto.ClassFilterDto;
import com.project.fitness_finder_backend.dto.GymClassDto;
import com.project.fitness_finder_backend.services.GymClassService;
import com.project.fitness_finder_backend.services.GymService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/gyms/classes")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class GymClassController {
	
	private final GymService gymService;
	private final GymClassService classService;
	
	@PostMapping("/class/data")
	public ResponseEntity<String> sampleData(){
		classService.gymSampleClasses();
		return ResponseEntity.ok("Class Data Added");
	}
	
	@GetMapping
	public ResponseEntity<List<GymClassDto>> getAllClasses(){
		List<GymClassDto> dtos = classService.getAllClasses();
		return ResponseEntity.ok(dtos);
	}
	
	@GetMapping("/gym/{gymId}")
	public ResponseEntity<List<GymClassDto>> getByGymId(@PathVariable Long gymId){
		return ResponseEntity.ok(classService.getClassesByGym(gymId));
	}
	
	@GetMapping("/classes/{type}")
	public ResponseEntity<List<GymClassDto>> getByType(@PathVariable String type){
		List<GymClassDto> dtos = classService.getClassesByType(type);
		return ResponseEntity.ok(dtos);
	}
	
	@PostMapping("/filter")
	public ResponseEntity<List<GymClassDto>> filterClass(@RequestBody ClassFilterDto filterDto){
		List<GymClassDto> dtos = classService.filterClass(filterDto);
		return ResponseEntity.ok(dtos);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<GymClassDto> updateGymClass
		(@PathVariable Long id, @RequestBody GymClassDto classDto){
		return ResponseEntity.ok(classService.updateClass(id, classDto));
	}
	
	@DeleteMapping
	public ResponseEntity<GymClassDto> deleteAllGymClass(){
		classService.deleteAllGymClass();
		return ResponseEntity.noContent().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<GymClassDto> deleteGymClassById(Long id){
		classService.deleteGymClassById(id);
		return ResponseEntity.noContent().build();
	}
	
	@PutMapping("/{id}/gymId/{gymId}")
	public ResponseEntity<GymClassDto> updateGymId(@PathVariable Long id, @PathVariable Long gymId){
		return ResponseEntity.ok(classService.updateGymId(id, gymId));
	}
}
