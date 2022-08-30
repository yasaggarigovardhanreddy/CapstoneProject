package com.stackroute.pollutioncheck.wishlist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.pollutioncheck.wishlist.Exception.DataAlreadyExistsException;
import com.stackroute.pollutioncheck.wishlist.Exception.DataNotFoundException;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.service.FavService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/fav")
public class FavController {

	@Autowired
	private FavService service;
	
	
	@CrossOrigin
	@PostMapping("/{id}")
	public ResponseEntity<?> addFav(@PathVariable Long id,@RequestBody Lot lot){
		try {
			return new ResponseEntity<>(this.service.addFav(id, lot),HttpStatus.OK);
		}
		catch(DataAlreadyExistsException e) {
			System.out.println("Error Here");
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
	}
	
	
	@CrossOrigin
	@GetMapping("/{id}")
	public ResponseEntity<?> getAllByUserId(@PathVariable Long id){
		try {
			return new ResponseEntity<>(this.service.getAllFavByUserId(id),HttpStatus.OK);
		}
		catch(Exception e){
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
	}
	
	
	@CrossOrigin
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteByUserId(@PathVariable Long id,@RequestParam("lon") String lon, @RequestParam("lat") String lat){
		try {
			Lot lot = new Lot(Double.parseDouble(lon),Double.parseDouble(lat));
			return new ResponseEntity<>(this.service.deleteFav(id,lot),HttpStatus.OK);
		}
		catch(DataNotFoundException e) {
			System.out.println("Here in");
			return new ResponseEntity<>(e.getMessage(),HttpStatus.CONFLICT);
		}
		catch(Exception e) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
