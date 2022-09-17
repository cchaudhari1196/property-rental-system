package com.service;

import com.entities.Category;
import com.entities.Property;
import com.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

//controller -> service -> repos -> db

@Service
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
	public Property getProperty(int p_id)
	{
		return propertyRepository.getById(p_id);
	}

	public Property save(Property p) {
		return propertyRepository.save(p);
	}

	public List<Property> searchbykeyword(String pname, String pdesc) {
		// TODO Auto-generated method stub
		return propertyRepository.searchbykeyword(pname, pdesc);
		
	}
	public List<Property> getPropertysByCategory(String category) {
		return propertyRepository.getByCategoryName(category);
	}

	public List<Property> getProductsByCategoryId(Integer categoryId) {
		return propertyRepository.getByCategoryId(categoryId);
	}

	public List<Property> getByVid(int v_id) {
		return propertyRepository.getByVid(v_id);
	}

	public int addproduct(com.models.Property property) throws Exception {
		try{
			Property propertyEntity = new Property();
			propertyEntity.setPname(property.getPname());
			propertyEntity.setImageUrl(property.getImageUrl());
			propertyEntity.setPdesc(property.getPdesc());
			propertyEntity.setRent(property.getRent());
			Set<Category> categories = property.getCategoryIds()
							.stream().map(e-> categoryservice.getCategoryById(e)).collect(Collectors.toSet());
			propertyEntity.setCategories(categories);
			propertyEntity.setOwner(ownerService.getVendor(property.getvId()));
			propertyRepository.save(propertyEntity);
			return propertyEntity.getP_id();
		}
		catch (Exception ex){
			ex.printStackTrace();
			throw new Exception("Adding product failed"+ ex.getMessage());
		}
	}
}
