package com.project.fitness_finder_backend.services.utils;

import java.util.Date;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import lombok.Data;

@Component
@Data
public class JwtUtil {

	@Value("${jwt.secret}")
	private String secret;

	@Value("${jwt.expiration:86400000}")
	private Long expiration;

	private SecretKey key;

	@PostConstruct
	public void init() {
		// Generate secure key from secret string
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	
	public String generateToken(String email) {
		return Jwts.builder().subject(email) 
				.issuedAt(new Date(System.currentTimeMillis())) 
				.expiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(key) 
				.compact();
	}

	// Extract email (modern syntax)
	public String extractEmail(String token) {
		return extractClaim(token, Claims::getSubject);
	}

	public Date extractExpiry(String token) {
		return extractClaim(token, Claims::getExpiration);
	}

	public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {
		return Jwts.parser().verifyWith(key) 
				.build().parseSignedClaims(token) 
				.getPayload();
	}

	private Boolean isTokenExpired(String token) {
		return extractExpiry(token).before(new Date());
	}

	public Boolean validateToken(String token, String email) {
		final String extractedEmail = extractEmail(token);
		return (extractedEmail.equals(email) && !isTokenExpired(token));
	}

	public Boolean isTokenValid(String token) {
		try {
			Jwts.parser().verifyWith(key).build().parseSignedClaims(token);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
}
