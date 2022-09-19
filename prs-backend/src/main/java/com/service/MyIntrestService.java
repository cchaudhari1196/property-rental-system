package com.service;

import com.entities.Property;
import com.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class MyIntrestService {


	@Autowired
	UserService userService;

	@Autowired
	PropertyService propertyService;

	public List<Property> findIntrestedProperties(int uId){
		List<Property> properties = propertyService.getIntrestingPropertiesByUser(uId);
		return properties;
	}

	public boolean addMyIntrest(Integer propertyId, Integer userId) throws Exception {
		User user;
		Property property;
		try{
			user = userService.getUserById(userId);
		}
		catch (NoSuchElementException e){
			throw new Exception("User Not found. Check User Id");
		}

		try{
			property = propertyService.getPropertyById(propertyId);
		}
		catch (NoSuchElementException e){
			throw new Exception("User Not found. Check User Id");
		}

		property.addIntrestedUser(user);
		propertyService.save(property);
		return true;
	}


	public boolean removeIntrest(Integer propertyId, Integer userId) throws Exception {
		User user;
		Property property;
		try{
			user = userService.getUserById(userId);
		}
		catch (NoSuchElementException e){
			throw new Exception("User Not found. Check User Id");
		}

		try{
			property = propertyService.getPropertyById(propertyId);
		}
		catch (NoSuchElementException e){
			throw new Exception("User Not found. Check User Id");
		}

		property.removeIntrestedUser(user);
		propertyService.save(property);
		return true;
	}
}