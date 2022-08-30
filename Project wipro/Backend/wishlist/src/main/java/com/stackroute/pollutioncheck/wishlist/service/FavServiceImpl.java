package com.stackroute.pollutioncheck.wishlist.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.pollutioncheck.wishlist.Exception.DataAlreadyExistsException;
import com.stackroute.pollutioncheck.wishlist.Exception.DataNotFoundException;
import com.stackroute.pollutioncheck.wishlist.Exception.UserNotFoundException;
import com.stackroute.pollutioncheck.wishlist.FavRepo.WishlistRepo;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.model.UserDetails;

@Service
public class FavServiceImpl implements FavService {

	@Autowired
	private WishlistRepo rep;

	@Override
	public boolean addFav(Long id, Lot lot) throws DataAlreadyExistsException {
		// TODO Auto-generated method stub
		if(this.rep.existsById(id)) {
			UserDetails user = this.rep.findByUserId(id);
			List<Lot> lst = user.getCoordinates();
			for (Lot lot1 : lst) {
				if(lot1.getLat()==lot.getLat() && lot1.getLon()==lot.getLon()) {
					throw new DataAlreadyExistsException("Data Already Exists");
				}
			}
			lst.add(lot);
			user.setCoordinates(lst);
			System.out.println(user);
			this.rep.save(user);
		}
		else {
			UserDetails user = new UserDetails();
			user.setUserId(id);
			List<Lot> list = new ArrayList<>();
			list.add(lot);
			user.setCoordinates(list);
			this.rep.save(user);
		}
		return true;
	}

	@Override
	public UserDetails getAllFavByUserId(Long id) throws UserNotFoundException {
		// TODO Auto-generated method stub
		if(!this.rep.existsById(id)) {
			throw new UserNotFoundException("No User Found");
		}
		return this.rep.findByUserId(id);
	}

	@Override
	public UserDetails deleteFav(Long id,Lot lot) throws DataNotFoundException {
		// TODO Auto-generated method stub
		
		if(this.rep.existsById(id)) {
			UserDetails user = null;
			user = this.rep.findByUserId(id);
			List<Lot> lst = user.getCoordinates();
			for (Iterator<Lot> iterator = lst.iterator(); iterator.hasNext(); ) {
				Lot lot1 = iterator.next();
				if(lot1.getLat() == lot.getLat() && lot1.getLon() == lot.getLon()) {
					iterator.remove();
				}
			}
			user.setCoordinates(lst);
			this.rep.save(user);
			return user;
		}
		else {
			throw new DataNotFoundException("Data Not Found");
		}
	}

	
	
	

}
