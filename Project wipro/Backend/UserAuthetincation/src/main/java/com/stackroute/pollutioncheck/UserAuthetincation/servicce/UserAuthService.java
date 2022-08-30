package com.stackroute.pollutioncheck.UserAuthetincation.servicce;

import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserAlreadyExistException;
import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserNotFoundException;
import com.stackroute.pollutioncheck.UserAuthetincation.model.User;

public interface UserAuthService {

	public User findByEmailAndPassword(String email, String password) throws UserNotFoundException;

    boolean saveUser(User user) throws UserAlreadyExistException;
}
