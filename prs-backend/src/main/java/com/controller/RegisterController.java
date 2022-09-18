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


    @PostMapping("/furnished_type")
    public ResponseEntity<Category> registerAuthor(@RequestBody Category category)
    {
        if(category == null || category.getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        category.setCategoryType(RegistrationService.FURNISHED_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/furnished_type")
    public ResponseEntity<List<Category>> getFurnishedType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.FURNISHED_TYPE));
    }



    @PostMapping("/tenent_type")
    public ResponseEntity<Category> registerTenent(@RequestBody Category category)
    {
        if(category == null || category.getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        category.setCategoryType(RegistrationService.TENENT_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/tenent_type")
    public ResponseEntity<List<Category>> getTenentType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.TENENT_TYPE));
    }

    @PostMapping("/parking_type")
    public ResponseEntity<Category> registerparkingType(@RequestBody Category category)
    {
        if(category == null || category.getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        category.setCategoryType(RegistrationService.PARKING_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/parking_type")
    public ResponseEntity<List<Category>> getparkingType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.PARKING_TYPE));
    }

    /*BHKs*/
    @PostMapping("/property_structure_type")
    public ResponseEntity<Category> registerpropertyStructureType(@RequestBody Category category)
    {
        if(category == null || category.getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        category.setCategoryType(RegistrationService.PROPERTY_STRUCTURE_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/property_structure_type")
    public ResponseEntity<List<Category>> getpropertyStructureType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.PROPERTY_STRUCTURE_TYPE));
    }

    @PostMapping("/property_type")
    public ResponseEntity<Category> registerpropertyType(@RequestBody Category category)
    {
        if(category == null || category.getName() == null){
            return ResponseEntity.badRequest().body(null);
        }
        category.setCategoryType(RegistrationService.PROPERTY_TYPE);
        registrationService.registerCategory(category);
        return ResponseEntity.ok(category);
    }

    @GetMapping("/property_type")
    public ResponseEntity<List<Category>> getpropertyType()
    {
        return ResponseEntity.ok(registrationService.getCategoryByType(RegistrationService.PROPERTY_TYPE));
    }
}
