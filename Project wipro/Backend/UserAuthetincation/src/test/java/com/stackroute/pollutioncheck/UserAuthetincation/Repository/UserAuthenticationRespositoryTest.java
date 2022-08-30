package com.stackroute.pollutioncheck.UserAuthetincation.Repository;

import static org.junit.Assert.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.stackroute.pollutioncheck.UserAuthetincation.model.User;
import com.stackroute.pollutioncheck.UserAuthetincation.repository.UserRepository;


@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
public class UserAuthenticationRespositoryTest {

//	@Autowired
//	private UserRepository repository;
//	
//	private User getUser() {
//		return new User(12,"naresh","naresh123@gmail.com","narri123");
//	}
//	
//	
//	@Test
//	public void findByEmailAndPassword() {
//		User user = getUser();
//		assertNotEquals(getUser().getUserName(), repository.findByEmailAndPassword("bsf123@gmail.com", "Bsf12345").getUserName());
//		this.repository.delete(user);
//	}
//	
//	
//	@Test
//	public void findByIdAndPasswordTest() {
//		User user = getUser();
//		assertNotEquals(user.getId(),this.repository.findByIdAndPassword(3,"wewasdda"));
//		this.repository.delete(user);
//	}
//	
	
}
