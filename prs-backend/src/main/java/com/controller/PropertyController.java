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
@RequestMapping("/product")
@RestController
public class PropertyController {
	@Autowired
    PropertyService pservice;

	@Autowired
	FilesStorageService storageService;

	/* TODO - In other get mapping I tried integrating this method. We need to test*/
	@GetMapping("/all")
	public List<Property> getAllProperties() {
		return pservice.getAllProperties();
	}

	@PostMapping("/searchbykeyword")
	public List<Property> searchbykeyword(@RequestBody Property p) {
		return pservice.searchbykeyword(p.getPname(), p.getPdesc());
	}
	@GetMapping()
	public List<Property> getByCatrgory(@RequestParam(name="category", required = false) String category, @RequestParam(name = "categoryId", required = false) Integer categoryId) {
		if(StringUtils.isNotEmpty(category)){
			return pservice.getPropertysByCategory(category);
		}
		else if(categoryId != null){
			return pservice.getProductsByCategoryId(categoryId);
		}
		else{
			return pservice.getAllProperties();
		}
	}


	@GetMapping("/search/{data}")
	public List<Property> searchRaw(@PathVariable("data") String data) {
		return pservice.getAllProperties().stream().filter((e) -> {
			return StringUtils.containsIgnoreCase(e.getPname(),data);
		}).collect(Collectors.toList());
	}

	@GetMapping("/viewbyvid")
	public List<Property> getByVid(@RequestParam("v_id")int v_id){
		return pservice.getByVid(v_id);
	}


	@PostMapping
	public Integer addProperty(@RequestBody com.models.Property property){
		try {
			return pservice.addproduct(property);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

}
