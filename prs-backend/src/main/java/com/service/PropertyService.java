package com.service;

import com.entities.Category;
import com.entities.Property;
import com.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyService {
	@Autowired
	PropertyRepository propertyRepository;
	@Autowired
	OwnerService ownerService;

	@Autowired
	private CategoryService categoryservice;


	public List<Property> getAllProperties() {
		return propertyRepository.findAll();
	}
	public Property getPropertyById(int pId)
	{
		Property property = propertyRepository.getById(pId);
		property.getCategories();
		property.getIntrestedUser();
		property.getOwner();
		return property;
	}

	public void deleteProject(int pId) throws Exception {
		Property property = propertyRepository.getById(pId);
		if(property == null){
			throw new Exception("property doesnt exists");
		}
		propertyRepository.delete(property);
	}

	public Property save(Property p) {
		return propertyRepository.save(p);
	}

	public List<Property> searchbykeyword(String pname, String pdesc) {
		// TODO Auto-generated method stub
		return propertyRepository.searchbykeyword(pname, pdesc);
	}

	public List<String> getCities() {
		// TODO Auto-generated method stub
		return propertyRepository.getCityList();
	}

	public List<Property> getPropertysByCategory(String category) {
		return propertyRepository.getByCategoryName(category);
	}

	public List<Property> getPropertiesByCategoryId(Integer categoryId) {
		return propertyRepository.getByCategoryId(categoryId);
	}

	public List<Property> getPropertiesByCity(String city) {
		return propertyRepository.findByCityEqualsIgnoreCase(city);
	}


	public List<Property> getIntrestingPropertiesByUser(Integer userId) {
		return propertyRepository.getPropertiesByIntrestedUser(userId);
	}

	public List<Property> getByOwnerid(int ownerId) {
		return propertyRepository.getByOwnerid(ownerId);
	}

	public int addProperty(com.models.Property property) throws Exception {
		try{
			Property propertyEntity = new Property();
			propertyEntity.setName(property.getName());
			propertyEntity.setImageUrl(property.getImageUrl());
			propertyEntity.setDescription(property.getDesc());
			propertyEntity.setRent(property.getRent());
			propertyEntity.setDescription(property.getDesc());
			propertyEntity.setAddress(property.getAddress());
			propertyEntity.setArea(property.getArea());
			propertyEntity.setAvailable(true);
			propertyEntity.setDeposite(property.getDeposite());
			propertyEntity.setCity(property.getCity());
			propertyEntity.setTimestamp(Timestamp.from(Instant.now()));
			propertyEntity.setNoOfBalconies(property.getNoOfBalconies());
			Set<Category> categories = property.getCategoryIds()
							.stream().map(e-> categoryservice.getCategoryById(e)).collect(Collectors.toSet());
			propertyEntity.setCategories(categories);
			propertyEntity.setOwner(ownerService.getOwner(property.getOwnerId()));
			propertyRepository.save(propertyEntity);
			return propertyEntity.getId();
		}
		catch (Exception ex){
			ex.printStackTrace();
			throw new Exception("Adding Property failed"+ ex.getMessage());
		}
	}

	public void changeAvailability(Integer propertyId) throws Exception {
		try{
			Property property = propertyRepository.getById(propertyId);
			if(property.isAvailable()){
				property.setAvailable(false);
			}
			else {
				property.setAvailable(true);
			}
			propertyRepository.save(property);
		}
		catch (Exception ex){
			ex.printStackTrace();
			throw new Exception("Unable to change the status of property"+ ex.getMessage());
		}
	}
}
