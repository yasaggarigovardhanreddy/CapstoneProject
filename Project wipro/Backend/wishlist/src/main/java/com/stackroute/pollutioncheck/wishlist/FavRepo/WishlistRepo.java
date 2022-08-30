package com.stackroute.pollutioncheck.wishlist.FavRepo;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.mongodb.BasicDBObject;
import com.stackroute.pollutioncheck.wishlist.model.Lot;
import com.stackroute.pollutioncheck.wishlist.model.UserDetails;


@Repository
public interface WishlistRepo extends MongoRepository<UserDetails, Long>{

	UserDetails findByUserId(Long id);

}
