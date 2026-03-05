package com.project.fitness_finder_backend.services.serviceImple;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.project.fitness_finder_backend.dto.ClassFilterDto;
import com.project.fitness_finder_backend.dto.GymClassDto;
import com.project.fitness_finder_backend.entity.Gym;
import com.project.fitness_finder_backend.entity.GymClass;
import com.project.fitness_finder_backend.exceptionHandler.ResourceNotFoundException;
import com.project.fitness_finder_backend.mapper.GymClassMapper;
import com.project.fitness_finder_backend.repository.GymClassRepository;
import com.project.fitness_finder_backend.repository.GymRepository;
import com.project.fitness_finder_backend.services.GymClassService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class GymClassServiceImpl implements GymClassService{
	
	private final GymClassRepository classRepository;
	private final GymClassMapper classMapper;
	private final GymRepository gymRepository;
	@Override
	public List<GymClassDto> filterClass(ClassFilterDto filter) {
		return classRepository.filterClasses(filter.getType(),
											filter.getPrice()>0 ? filter.getPrice() : null)
				.stream().map(classMapper::toDto).toList();
	}

	@Override
	public List<GymClassDto> getAllClasses() {
		return classRepository.findAll().stream().map(classMapper::toDto).toList();
	}

	@Override
	public List<GymClassDto> getClassesByGym(Long gymId) {
		return classRepository.findByGymId(gymId).stream().map(classMapper::toDto).toList();
	}

	@Override
	public List<GymClassDto> getClassesByType(String type) {
		return classRepository.findByTypeIgnoreCase(type).stream().map(classMapper::toDto).toList();
	}

	@Override
	public GymClassDto createGymClass(long gymId, GymClassDto classDto) {
		Gym gym = gymRepository.findById(gymId)
				.orElseThrow(() -> new ResourceNotFoundException("Gym Not Found: " + gymId));
		
		GymClass gymClass = classMapper.toEntity(classDto);
		gymClass.setGym(gym);
		
		GymClass savedClass = classRepository.save(gymClass);
		
		return classMapper.toDto(savedClass);
	}

	@Override
	public void gymSampleClasses() {
		if (classRepository.count() == 0) {
	        List<GymClass> sampleClasses = List.of(
	            createClass("Advanced Yoga", "Yoga", "7:00 AM", 600, 1L),
	            createClass("Power Lifting", "Strength", "6:00 AM", 800, 1L),
	            
	            createClass("Cardio Blast", "Cardio", "8:00 AM", 450, 2L),
	            createClass("Weight Training", "Strength", "5:30 AM", 700, 2L),
	            
	            createClass("Heavy Deadlift", "Strength", "6:30 AM", 900, 3L),
	            createClass("Boxing Pro", "Combat", "9:00 PM", 650, 3L),
	            
	            createClass("Hatha Yoga", "Yoga", "6:00 AM", 500, 4L),
	            createClass("Yin Yoga", "Yoga", "8:00 PM", 400, 4L),
	            
	            createClass("CrossFit WOD", "CrossFit", "5:00 AM", 850, 5L),
	            createClass("HIIT Challenge", "HIIT", "7:00 PM", 550, 5L),
	            
	            createClass("Bodybuilding", "Strength", "5:00 AM", 750, 6L),
	            createClass("Functional Training", "Functional", "6:30 PM", 500, 6L),
	            
	            createClass("Muscle Pump", "Strength", "7:00 AM", 650, 7L),
	            createClass("Kettlebell", "Strength", "6:00 PM", 450, 7L),
	            
	            createClass("Zumba Fitness", "Zumba", "7:30 PM", 400, 8L),
	            createClass("Bollywood Dance", "Dance", "6:30 PM", 350, 8L),
	            
	            createClass("Flexibility Flow", "Yoga", "6:00 AM", 450, 9L),
	            createClass("Core Crusher", "Core", "8:00 AM", 500, 9L),
	            
	            createClass("Peak Power", "Strength", "5:30 AM", 800, 10L),
	            createClass("Endurance Run", "Cardio", "7:00 AM", 550, 10L)
	        );
	        classRepository.saveAll(sampleClasses);
	    }
		
	}
	private GymClass createClass(String name, String type, String time, int price, long gymId) {
	    Gym gym = gymRepository.findById(gymId)
	    		.orElseThrow(() -> new ResourceNotFoundException("Gym not found to add: " + gymId));
	    GymClass gymClass = new GymClass();
	    gymClass.setName(name);
	    gymClass.setType(type);
	    gymClass.setTime(time);
	    gymClass.setPrice(price);
	    gymClass.setGym(gym);
	    return gymClass;
	}

	@Override
	public GymClassDto updateClass(Long gymId, GymClassDto classDto) {
		GymClass existing = classRepository.findById(gymId)
				.orElseThrow(()-> new ResourceNotFoundException("Gym Class Not Found: " + gymId));
		existing.setName(classDto.getName());
		existing.setType(classDto.getType());
		existing.setTime(classDto.getTime());
		existing.setPrice(classDto.getPrice());
		
		GymClass updated = classRepository.save(existing);
		return classMapper.toDto(updated);
	}

	@Override
	public void deleteAllGymClass() {
		classRepository.deleteAll();
		
	}

	@Override
	public void deleteGymClassById(Long id) {
		if(classRepository.existsById(id)) {
			classRepository.deleteById(id);
		}
		else {
			throw new ResourceNotFoundException("Gym Class Not Found: " + id);
		}
		
	}

	@Override
	public GymClassDto updateGymId(Long id, Long gymId) {
		GymClass gymClass = classRepository.findById(id)
	            .orElseThrow(() -> new ResourceNotFoundException("Class not found: " + id));
	    
	    Gym newGym = gymRepository.findById(gymId)
	            .orElseThrow(() -> new ResourceNotFoundException("Gym not found: " + gymId));
	    
	    gymClass.setGym(newGym); 
	    
	    GymClass updated = classRepository.save(gymClass);
	    return classMapper.toDto(updated);
	}

		
	

}
