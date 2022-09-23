package com.controller;

import com.entities.Property;
import com.service.FilesStorageService;
import com.service.MyIntrestService;
import com.service.PropertyService;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
	MyIntrestService myIntrestService;

	@Autowired
	FilesStorageService storageService;

	@GetMapping("/{id}")
	public ResponseEntity<Property> getById(@PathVariable("id") int id){
		Property property = propertyService.getPropertyById(id);
//		if(property instanceof HibernateProxy){
//			return (Property) ((HibernateProxy) property).getHibernateLazyInitializer().getImplementation();
//		}
		return ResponseEntity.ok(property);
	}


	@DeleteMapping("/{id}")
	public void deleteById(@PathVariable("id") int id) throws Exception {
		propertyService.deleteProject(id);
	}

	/*Here if we dont pass any value all data will be returned*/
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



	@PostMapping("/searchbykeyword")
	public List<Property> searchbykeyword(@RequestBody Property p) {
		return propertyService.searchbykeyword(p.getName(), p.getDescription());
	}

	@GetMapping("/cities")
	public List<String> getCities() {
		return propertyService.getCities();
	}

	@GetMapping("/search/{data}")
	public List<Property> searchRaw(@PathVariable("data") String data) {
		return propertyService.getAllProperties().stream().filter((e) -> {
			return (StringUtils.containsIgnoreCase(e.getName(),data) ||
					StringUtils.containsIgnoreCase(e.getCity(),data) ||
					StringUtils.containsIgnoreCase(e.getArea(),data) ||
					StringUtils.containsIgnoreCase(e.getAddress(),data)) &&
					BooleanUtils.isTrue(e.isAvailable());
		}).collect(Collectors.toList());
	}

	@GetMapping("/by_owner")
	public List<Property> getByVid(@RequestParam("id")int id){
		return propertyService.getByOwnerid(id);
	}


	@PostMapping
	public Integer showIntrest(@RequestBody com.models.Property property){
		try {
			return propertyService.addProperty(property);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}


	@PutMapping("/change_availability/{id}")
	public void showIntrest(@PathVariable("id") Integer propertyId){
		try {
			propertyService.changeAvailability(propertyId);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@PostMapping("/show_interest")
	public ResponseEntity showIntrest(@RequestParam("user_id") Integer userId, @RequestParam("property_id") Integer propertyId){
		try {
			myIntrestService.addMyIntrest(propertyId,userId);
		}  catch (NoSuchMethodException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}catch (Exception e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
		return ResponseEntity.ok().body("Done");
	}

	@PostMapping("/remove_interest")
	public ResponseEntity removeIntrest(@RequestParam("user_id") Integer userId, @RequestParam("property_id") Integer propertyId){
		try {
			myIntrestService.removeIntrest(propertyId,userId);
		}  catch (NoSuchMethodException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}catch (Exception e) {
			return ResponseEntity.internalServerError().body(e.getMessage());
		}
		return ResponseEntity.ok().body("Done");
	}
}
