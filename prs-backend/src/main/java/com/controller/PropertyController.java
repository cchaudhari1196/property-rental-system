package com.controller;

import com.entities.Property;
import com.service.FilesStorageService;
import com.service.PropertyService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin("*")
@RequestMapping("/property")
@RestController
public class PropertyController {
	@Autowired
    PropertyService propertyService;

	@Autowired
	FilesStorageService storageService;

	/* TODO - In other get mapping I tried integrating this method. We need to test*/
	@GetMapping("/all")
	public List<Property> getAllProperties() {
		return propertyService.getAllProperties();
	}

	@PostMapping("/searchbykeyword")
	public List<Property> searchbykeyword(@RequestBody Property p) {
		return propertyService.searchbykeyword(p.getPname(), p.getPdesc());
	}
	@GetMapping()
	public List<Property> getByCatrgory(@RequestParam(name="category", required = false) String category,
										@RequestParam(name = "categoryId", required = false) Integer categoryId,
										@RequestParam(name = "city", required = false) String city)
	{
		if(StringUtils.isNotEmpty(category)){
			return propertyService.getPropertysByCategory(category);
		}
		else if(categoryId != null){
			return propertyService.getPropertiesByCategoryId(categoryId);
		}
		else if(city != null){
			return propertyService.getPropertiesByCity(city);
		}
		else{
			return propertyService.getAllProperties();
		}
	}


	@GetMapping("/search/{data}")
	public List<Property> searchRaw(@PathVariable("data") String data) {
		return propertyService.getAllProperties().stream().filter((e) -> {
			return StringUtils.containsIgnoreCase(e.getPname(),data);
		}).collect(Collectors.toList());
	}

	@GetMapping("/by_owner")
	public List<Property> getByVid(@RequestParam("id")int id){
		return propertyService.getByVid(id);
	}


	@PostMapping
	public Integer addProperty(@RequestBody com.models.Property property){
		try {
			return propertyService.addProperty(property);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
