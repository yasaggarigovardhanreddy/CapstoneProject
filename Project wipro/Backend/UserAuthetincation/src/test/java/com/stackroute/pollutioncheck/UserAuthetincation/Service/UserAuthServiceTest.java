package com.stackroute.pollutioncheck.UserAuthetincation.Service;

import static org.junit.Assert.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;


import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserAlreadyExistException;
import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserNotFoundException;
import com.stackroute.pollutioncheck.UserAuthetincation.model.User;
import com.stackroute.pollutioncheck.UserAuthetincation.repository.UserRepository;
import com.stackroute.pollutioncheck.UserAuthetincation.servicce.UserAuthService;
import com.stackroute.pollutioncheck.UserAuthetincation.servicce.UserAuthServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserAuthServiceTest {

	
	@Autowired
	private UserAuthServiceImpl service;
	
	@MockBean
	private UserRepository repository;
	
	@Test
	public void findUserByEmailAndPasswordTest() throws UserNotFoundException {
		when(repository.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345")).thenReturn(new User(3,"Suresh","bsf123@gmail.com","Bsf12345"));
		
		assertEquals(3,service.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345").getId());
		
	}
	
	
	@Test
	public void findUserByEmailAndPasswordNegativeTest() throws UserNotFoundException {
		when(repository.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345")).thenReturn(new User(1,"Ramesh","bsf124@gmail.com","Bf12345"));
		
		assertNotEquals(3,service.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345").getId());
	}
	
	@Test
	public void findUserByEmailAndPasswordExceptionTest() throws UserNotFoundException {
		when(repository.findByEmailAndPassword("", "")).thenReturn(new User());
		assertThrows(UserNotFoundException.class, () -> {
			service.findByEmailAndPassword("bf423@gmail.com", "Bsf13");
		});
	}
	
	@Test
	public void saveUserTest() throws UserAlreadyExistException {
		//when(repository.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345")).thenReturn(new User(1,"Ramesh","bsf124@gmail.com","Bf12345"));
		assertEquals(true,service.saveUser(new User(1,"Ramesh","bsf124@gmail.com","Bf12345")));
	}
}
