package com.stackroute.pollutioncheck.wishlist.Respository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;

import java.util.ArrayList;
import java.util.List;

import org.junit.After;
import org.junit.Before;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.TestInstance.Lifecycle;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.stackroute.pollutioncheck.wishlist.FavRepo.WishlistRepo;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.model.UserDetails;



@ExtendWith(SpringExtension.class)
@SpringBootTest
@TestInstance(Lifecycle.PER_CLASS)
public class RespositoryLayerTest {

	@Autowired
	private WishlistRepo rep;
	
	public UserDetails getUser() {
		List<Lot> list = new ArrayList<>();
		Lot lot = new Lot(89.87,897.5);
		list.add(lot);
		return new UserDetails(Long.parseLong("12"),list);
	}
	@BeforeAll
	public void setUp() {
		UserDetails user = getUser();
		this.rep.save(user);
	}
	@Test
	public void findByUserIdTest() {
		UserDetails user = getUser();
		assertNotEquals(user.getUserId(), this.rep.findByUserId(Long.parseLong("12")));
	}
	
	@AfterAll
	public void tearUp() {
		UserDetails user = getUser();
		this.rep.delete(user);
	}
}
