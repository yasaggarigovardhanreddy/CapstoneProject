package com.stackroute.pollutioncheck.wishlist.model;

public class Lot {

	private double lon;
	private double lat;
	public Lot(double lon, double lat) {
		super();
		this.lon = lon;
		this.lat = lat;
	}
	public Lot() {
		super();
		// TODO Auto-generated constructor stub
	}
	public double getLon() {
		return lon;
	}
	public void setLon(double lon) {
		this.lon = lon;
	}
	public double getLat() {
		return lat;
	}
	public void setLat(double lat) {
		this.lat = lat;
	}
	
		
}
