package com.stackroute.pollutioncheck.wishlist.service;

import java.util.List;
import java.util.Optional;

import com.stackroute.pollutioncheck.wishlist.Exception.DataAlreadyExistsException;
import com.stackroute.pollutioncheck.wishlist.Exception.DataNotFoundException;
import com.stackroute.pollutioncheck.wishlist.Exception.UserNotFoundException;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.model.UserDetails;

public interface FavService {

	boolean addFav(Long id,Lot lot) throws DataAlreadyExistsException;
	UserDetails getAllFavByUserId(Long id)throws UserNotFoundException;
	UserDetails deleteFav(Long id,Lot lot) throws DataNotFoundException;
}
