package com.controller;


import com.entities.Category;
import com.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/register")
public class RegisterController {
    @Autowired
    private RegistrationService registrationService;


    @PostMapping("/furnishedType")
    public ResponseEntity<Category> registerAuthor(@RequestBody Category category)
    {
        category.setC_categoryType(RegistrationService.FURNISHED_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/furnishedType")
    public ResponseEntity<List<Category>> getFurnishedType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.FURNISHED_TYPE));
    }



    @PostMapping("/tenentType")
    public ResponseEntity<Category> registerTenent(@RequestBody Category category)
    {
        category.setC_categoryType(RegistrationService.TENENT_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/tenentType")
    public ResponseEntity<List<Category>> getTenentType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.TENENT_TYPE));
    }

    @PostMapping("/parkingType")
    public ResponseEntity<Category> registerparkingType(@RequestBody Category category)
    {
        category.setC_categoryType(RegistrationService.TENENT_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/parkingType")
    public ResponseEntity<List<Category>> getparkingType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.TENENT_TYPE));
    }

    /*BHKs*/
    @PostMapping("/propertyStructureType")
    public ResponseEntity<Category> registerpropertyStructureType(@RequestBody Category category)
    {
        category.setC_categoryType(RegistrationService.PROPERTY_STRUCTURE_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/propertyStructureType")
    public ResponseEntity<List<Category>> getpropertyStructureType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.PROPERTY_STRUCTURE_TYPE));
    }

    @PostMapping("/propertyType")
    public ResponseEntity<Category> registerpropertyType(@RequestBody Category category)
    {
        category.setC_categoryType(RegistrationService.PROPERTY_STRUCTURE_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/propertyType")
    public ResponseEntity<List<Category>> getpropertyType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.PROPERTY_STRUCTURE_TYPE));
    }
}
