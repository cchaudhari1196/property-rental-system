package com.service;


import com.entities.User;
import com.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService
{
	@Autowired
	private UserRepository userrepo;

	//register
	public User registerUser(User user) 
	{
		// TODO Auto-generated method stub
			return userrepo.save(user);
	}

	public User getUserById(int id)
	{
		return userrepo.findById(id).get();
	}

	//login
	public User loginUser(User user) {
		// TODO Auto-generated method stub
		
		User user1=userrepo.findByEmail(user.getEmail(),user.getPassword());
		
		if(user1!=null && user1.getEmail().equals(user.getEmail())&& user1.getPassword().equals(user.getPassword()))
			return user1 ;
		else
			return null;
	}


	//update
	public User updateUser(User user) {
		// TODO Auto-generated method stub
		User existinguser;
		existinguser=userrepo.findById(user.getId()).orElse(null);
		if(existinguser != null) {
			existinguser.setFname(user.getFname());
			existinguser.setLname(user.getLname());
			existinguser.setPhone(user.getPhone());
			existinguser.setEmail(user.getEmail());
			existinguser.setAddress(user.getAddress());
		}
		
		return userrepo.save(existinguser);
	}


	public boolean deleteUser(int u_id) {
		// TODO Auto-generated method stub
		
		userrepo.deleteById(u_id);
		return true;
		
	}


	public User singleUser(int u_id) {
		// TODO Auto-generated method stub
		return userrepo.findById(u_id).orElse(null);
	}


	public java.util.List<User> allUser() {
		// TODO Auto-generated method stub
		return userrepo.findAll();
	}
}

