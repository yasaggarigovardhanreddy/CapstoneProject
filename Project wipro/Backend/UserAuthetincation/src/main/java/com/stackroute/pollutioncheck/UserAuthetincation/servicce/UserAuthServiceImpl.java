package com.stackroute.pollutioncheck.UserAuthetincation.servicce;

import java.util.List;
import java.util.Optional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TypedQuery;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserAlreadyExistException;
import com.stackroute.pollutioncheck.UserAuthetincation.exception.UserNotFoundException;
import com.stackroute.pollutioncheck.UserAuthetincation.model.User;
import com.stackroute.pollutioncheck.UserAuthetincation.repository.UserRepository;
import com.stackroute.pollutioncheck.UserAuthetincation.util.TokenUtil;

@Service
public class UserAuthServiceImpl {
	
	@PersistenceContext
    private EntityManager em;
	
	@Autowired
    private TokenUtil tokenUtil;

	@Autowired 
	private UserRepository repository;

	public UserAuthServiceImpl(UserRepository repository) {
		this.repository = repository;
	}

	public User findByEmailAndPassword(String email, String password) throws UserNotFoundException {
		User user = repository.findByEmailAndPassword(email, password);
		if (user == null) {
			throw new UserNotFoundException("User is not found");
		}
		return user;
	}

	public boolean saveUser(User user) throws UserAlreadyExistException {
		java.util.Optional<User> optional = repository.findByEmail(user.getEmail());
		if (optional.isPresent()) {
			throw new UserAlreadyExistException("user already exist");
		}
		repository.save(user);
		return Boolean.TRUE;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	public User findUserDetailsByUsername(String username) throws UserNotFoundException {
        User user = findByUsername(username);
      
        User desired = new User();
        desired.setEmail(user.getEmail());
        desired.setUserName(user.getUserName());
        desired.setPassword(desired.getPassword());
        desired.setId(user.getId());
        return desired;
    }
	
	public User findByUsername(String username) throws UserNotFoundException {
        Optional<User> optional = findByUserName(username);
        if (!optional.isPresent()) {
            throw new UserNotFoundException("user not found for username=" + username);
        }
        User user = optional.get();
        return user;
    }
	
	public Optional<User> findByUserName(String username) {
        String queryText = "from User where email=:usernameArg";
        TypedQuery<User> query = em.createQuery(queryText, User.class);
        query.setParameter("usernameArg", username);
        List<User> list = query.getResultList();
        if (list.isEmpty()) {
            Optional<User> optional = Optional.empty();
            return optional;
        }

        User user = list.get(0);
        Optional<User> optional = Optional.of(user);
        return optional;
    }
	
	
	
    public User authenticateByToken(String token) throws Exception {
        String username = tokenUtil.decodeToken(token);
        User user = findByUsername(username);
        User desired = new User();
        desired.setEmail(user.getEmail());
        desired.setUserName(user.getUserName());
        desired.setPassword(desired.getPassword());
        desired.setId(user.getId());
        return desired;
    }
	
	
}
