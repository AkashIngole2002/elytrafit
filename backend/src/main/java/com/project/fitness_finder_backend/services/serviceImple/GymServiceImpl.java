package com.project.fitness_finder_backend.services.serviceImple;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.project.fitness_finder_backend.dto.GymDto;
import com.project.fitness_finder_backend.entity.Gym;
import com.project.fitness_finder_backend.exceptionHandler.ResourceNotFoundException;
import com.project.fitness_finder_backend.mapper.GymMapper;
import com.project.fitness_finder_backend.repository.GymRepository;
import com.project.fitness_finder_backend.services.GymService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymServiceImpl implements GymService{
	
	private final GymRepository gymRepository;
	private final GymMapper gymMapper;
	
	@Override
	public List<GymDto> getAllGyms() {
		List<Gym> gyms = gymRepository.findAll();
		return gyms.stream().map(gym -> gymMapper.toDto(gym)).toList();
	}

	@Override
	public GymDto getGymById(Long id) {
		Gym gym = gymRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Gym Not Found: " + id));
		return gymMapper.toDto(gym);
	}

	@Override
	public List<GymDto> getGymByCity(String city) {
		return gymRepository.findByLocationIgnoreCase(city)
				.stream().map(gymMapper::toDto).toList();
	}

	@Override
	public List<GymDto> getGymByClassCount() {
		return gymRepository.findAllWithClassCount()
				.stream().map(gymMapper::toDto).toList();
	}

	@Override
	public List<GymDto> getGymByName(String name) {
		return gymRepository.findByNameIgnoreCase(name)
				.stream().map(gymMapper::toDto).toList();
	}

	@Override
	public GymDto createGym(GymDto dto) {
		Gym gym = gymMapper.toEntity(dto);
		gym.setClasses(new ArrayList<>());
		Gym savedGym = gymRepository.save(gym);
		return gymMapper.toDto(savedGym);
	}

	@Override
	public void sampleGyms() {
	    if (gymRepository.count() == 0) {
	        List<Gym> gyms = List.of(
	            // 🔥 NAGPUR
	            new Gym("PowerGym Elite", "Nagpur", "123 Sitabuldi Main Road, Nagpur, MH 440012", 4.6, "₹1200-₹2200", 
	                    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400"),
	            new Gym("Muscle Factory", "Nagpur", "89 Manish Nagar, Nagpur, MH 440016", 4.9, "₹1500-₹2700",
	                    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"),
	            new Gym("CrossFit Central", "Nagpur", "101 Besa Border Road, Nagpur, MH 440023", 4.8, "₹1600-₹2800",
	                    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=400"),
	            
	            // 🔥 PUNE
	            new Gym("Pune Gold Gym", "Pune", "456 Koregaon Park, Pune, MH 411001", 4.5, "₹1000-₹2000",
	                    "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=400"),
	            new Gym("Fitness First", "Pune", "789 FC Road, Pune, MH 411004", 4.2, "₹800-₹1500",
	                    "https://images.unsplash.com/photo-1518623483510-7325c1b13672?w=400"),
	            
	            // 🔥 MUMBAI
	            new Gym("Bombay Iron Works", "Mumbai", "321 Bandra West, Mumbai, MH 400050", 4.7, "₹1800-₹3000",
	                    "https://images.unsplash.com/photo-1552674608-7e419510a6a5?w=400"),
	            new Gym("Elite Fitness Mumbai", "Mumbai", "555 Andheri East, Mumbai, MH 400059", 4.3, "₹1400-₹2500",
	                    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=400"),
	            
	            // 🔥 BANGALORE
	            new Gym("Blr Muscle Hub", "Bangalore", "222 MG Road, Bangalore, KA 560001", 4.6, "₹1300-₹2300",
	                    "https://images.unsplash.com/photo-1548362576-9608e031215a?w=400"),
	            new Gym("Namma Fitness", "Bangalore", "888 Koramangala, Bangalore, KA 560034", 4.4, "₹1100-₹2000",
	                    "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400"),
	            
	            // 🔥 HYDERABAD
	            new Gym("Hydra Power Gym", "Hyderabad", "999 Banjara Hills, Hyderabad, TS 500034", 4.8, "₹1500-₹2600",
	                    "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=400")
	        );
	        gymRepository.saveAll(gyms);
	    }
	}

	@Override
	public void deleteGymById(Long id) {
		if(gymRepository.existsById(id)) {
			gymRepository.deleteById(id);
		}else {
			throw new ResourceNotFoundException("Gym Not Found: " + id);
		}
		
	}

	@Override
	public void deleteAllGyms() {
		gymRepository.deleteAll();
		
	}

	@Override
	public GymDto updateGym(Long id, GymDto dto) {
		Gym existing = gymRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Gym Not Found: " + id));
		existing.setName(dto.getName());
		existing.setLocation(dto.getLocation());
		existing.setAddress(dto.getAddress());
		existing.setRating(dto.getRating());
		existing.setPriceRange(dto.getPriceRange());
		existing.setImageUrl(dto.getImageUrl());
		
		Gym updateGym = gymRepository.save(existing);
		
		return gymMapper.toDto(updateGym);
	}

}
