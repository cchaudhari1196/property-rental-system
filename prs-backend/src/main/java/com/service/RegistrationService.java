package com.service;

import com.entities.Category;
import com.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegistrationService {

    public static final String FURNISHED_TYPE="FurnishedType";
    public static final String TENENT_TYPE="TenentType";
    public static final String PROPERTY_STRUCTURE_TYPE="propertyStructureType";
    public static final String PARKING_TYPE="ParkingType";
    public static final String PROPERTY_TYPE="propertyType";
    @Autowired
    private CategoryRepository categoryRepository;

    //register
    public Category registerCategory(Category category)
    {
        return categoryRepository.save(category);
    }

    public List<Category> getCategoryByType(String type)
    {
        return categoryRepository.findCatergoryByType(type);
    }

}
