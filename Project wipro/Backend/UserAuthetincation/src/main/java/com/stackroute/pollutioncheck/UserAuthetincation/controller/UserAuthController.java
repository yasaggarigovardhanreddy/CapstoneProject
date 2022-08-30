package com.stackroute.pollutioncheck.UserAuthetincation.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserAlreadyExistException;
import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserNotFoundException;
import com.stackroute.pollutioncheck.UserAuthetincation.model.PayLoad;
import com.stackroute.pollutioncheck.UserAuthetincation.model.User;
import com.stackroute.pollutioncheck.UserAuthetincation.servicce.UserAuthServiceImpl;
import com.stackroute.pollutioncheck.UserAuthetincation.util.TokenUtil;


@RestController
@CrossOrigin(origins = "http://localhost:4200")
@RequestMapping("/api/v1/auth")
public class UserAuthController {

	@Autowired
	UserAuthServiceImpl service;
	
	@Autowired
    private TokenUtil tokenUtil;

	public UserAuthController() {

	}

	@PostMapping("/register")
	@CrossOrigin
	public ResponseEntity<?> register(@RequestBody User user) {
		try {
			service.saveUser(user);
			user.setPassword(null);
			return new ResponseEntity<User>(user, HttpStatus.CREATED);
		} catch (UserAlreadyExistException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);
		}
	}

	@PostMapping("/login")
	@CrossOrigin
	public ResponseEntity<?> login(@RequestBody User user) {
		try {
			User userDB = service.findByEmailAndPassword(user.getEmail(), user.getPassword());
			userDB.setPassword(null);
			PayLoad payload = new PayLoad();
			payload.setToken(getToken(user.getEmail(), user.getPassword()));
			payload.setUser(userDB);
			return new ResponseEntity<PayLoad>(payload, HttpStatus.OK);
		} catch (UserNotFoundException e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		} catch (Exception e) {
			return new ResponseEntity<String>(e.getMessage(), HttpStatus.UNAUTHORIZED);
		}
	}
	

	public String getToken(String id, String password) throws Exception {
//		return Jwts.builder().setId(id).setSubject(password).setIssuedAt(new Date())
//				.signWith(SignatureAlgorithm.HS256, "secretkey").compact();
		
		
		return tokenUtil.generateToken(id);

	}
}
