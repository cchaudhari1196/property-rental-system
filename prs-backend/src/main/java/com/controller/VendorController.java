package com.controller;

import com.entities.Owner;
import com.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/vendor")
public class VendorController
{

	@Autowired
	 private OwnerService vendorservice;
	 
	
	@PostMapping("/addvendor")
	public Owner registerVendor(@RequestBody Owner owner)
	{
		return vendorservice.registerVendor(owner);
	
	}//Ok
	
	@PostMapping("/loginvendor")
	//public ResponseEntity<Vendor> loginVendor(@RequestBody Vendor vendor)
	public ResponseEntity<Owner> loginVendor(@RequestBody Owner owner)
	{
		Owner value = vendorservice.loginVendor(owner);
		if(value!=null)
			return new ResponseEntity(value, HttpStatus.OK);
		else
			return new ResponseEntity("Wrong Username and Password", HttpStatus.FORBIDDEN);
		//return userservice.loginUser(user);

		
	}//Ok
	
	@PutMapping("/updatevendor")
	public Owner updateVendor(@RequestBody Owner owner)
	{
		return vendorservice.updateVendor(owner);
	}//Ok


	@PatchMapping("/approve/{v_id}/{v_status}")
	public Owner approvevendor(@PathVariable("v_id") int v_id, @PathVariable("v_status") Boolean v_status)
	{
		return vendorservice.approveVendor(v_id, v_status);
	}


	@DeleteMapping("/deletevendor/{v_id}")
	public Boolean deleteVendor(@PathVariable int v_id)
	{
		boolean value=vendorservice.deleteVendor(v_id);
		if(value==true)
			return true;
		else
			return false;
	}//Ok
	
	@GetMapping("/getvendor/{v_id}")
	public Owner singleVendor(@PathVariable int v_id)
	{
		return vendorservice.getVendor(v_id);
	}//Ok
	
	@GetMapping("/getallvendor")
	public List<Owner> allVendor()
	{
		return vendorservice.allVendor();
	}//Ok
	
	
	
	 
}
