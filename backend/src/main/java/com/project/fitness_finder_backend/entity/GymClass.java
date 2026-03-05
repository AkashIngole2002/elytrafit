package com.project.fitness_finder_backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GymClass {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column(nullable = false)
	private String name;
	
	@Column(nullable = false)
	private String type;
	
	@Column(nullable = false)
	private String time;
	
	@Column(nullable = false)	
	private int price;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "gym_id", nullable = false)
	private Gym gym;

	public GymClass(String name, String type, String time, int price, Gym gym) {
		super();
		this.name = name;
		this.type = type;
		this.time = time;
		this.price = price;
		this.gym = gym;
	}

}
