package com.project.fitness_finder_backend.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Gym {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String location;
	
	@Column(nullable = false, length = 200)
    private String address;   

    private Double rating = 0.0;
    private String priceRange = "₹500-₹2000";
    
    @Column(length = 500)
    private String imageUrl;
	
	@OneToMany(mappedBy = "gym", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<GymClass> classes = new ArrayList();

	public Gym(String name, String location, String address, Double rating, String priceRange, String imageUrl) {
        this.name = name;
        this.location = location;
        this.address = address;
        this.rating = rating;
        this.priceRange = priceRange;
        this.imageUrl = imageUrl;
        this.classes = new ArrayList<>();
    }

    public Gym(String name, String location, String address) {
        this.name = name;
        this.location = location;
        this.address = address;
        this.classes = new ArrayList<>();
    }
    
    
}
