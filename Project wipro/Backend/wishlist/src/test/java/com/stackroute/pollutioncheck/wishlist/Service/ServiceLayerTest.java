package com.stackroute.pollutioncheck.wishlist.Service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.when;

import java.util.Arrays;
import java.util.List;

import org.junit.Before;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.stackroute.pollutioncheck.wishlist.Exception.DataAlreadyExistsException;
import com.stackroute.pollutioncheck.wishlist.Exception.DataNotFoundException;
import com.stackroute.pollutioncheck.wishlist.Exception.UserNotFoundException;
import com.stackroute.pollutioncheck.wishlist.FavRepo.WishlistRepo;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.model.UserDetails;
import com.stackroute.pollutioncheck.wishlist.service.FavServiceImpl;


@RunWith(SpringRunner.class)
@SpringBootTest
public class ServiceLayerTest {

	@Autowired
	private FavServiceImpl service;
	
	@MockBean
	private WishlistRepo repository;
	
	private List<UserDetails> list;
	
	private List<Lot> containers;
	 @Before
	    public void initContainers() {
		 list.add(new UserDetails(Long.parseLong("1"),containers));
		 list.add(new UserDetails(Long.parseLong("1"),containers));
	     containers =  Arrays.asList(new Lot(234.342,342.212),new Lot(11.342,32.212));
	    }
	 
	 @Test
	public void getAllByIdTest() throws NumberFormatException, UserNotFoundException {
		when(repository.findByUserId(Long.parseLong("1"))).thenReturn(new UserDetails(Long.parseLong("1"),containers)); 
		assertThrows(UserNotFoundException.class, () -> {
			service.getAllFavByUserId(Long.parseLong("1"));
		});
	}
	 
	 @Test
		public void deletFavTest() throws NumberFormatException, DataNotFoundException {
			when(repository.findByUserId(Long.parseLong("1"))).thenReturn(new UserDetails(Long.parseLong("1"),containers)); 
			assertThrows(DataNotFoundException.class, () -> {
				service.deleteFav(Long.parseLong("1"),new Lot(123.21,233.12));
			});
		}
	
}
