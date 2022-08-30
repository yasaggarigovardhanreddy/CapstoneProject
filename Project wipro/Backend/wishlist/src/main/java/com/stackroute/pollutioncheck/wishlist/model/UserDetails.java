package com.stackroute.pollutioncheck.wishlist.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "WishList")
public class UserDetails {
	@Id
	private Long userId;
	private List<Lot> coordinates;
	public UserDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	public UserDetails(Long userId, List<Lot> coordinates) {
		super();
		this.userId = userId;
		this.coordinates = coordinates;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public List<Lot> getCoordinates() {
		return coordinates;
	}
	public void setCoordinates(List<Lot> coordinates) {
		this.coordinates = coordinates;
	}
	
	
	
	

}
