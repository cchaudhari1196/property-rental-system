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
@RequestMapping("/owner")
public class OwnerController
{

	@Autowired
	 private OwnerService vendorservice;


	@PostMapping
	public Owner registerOwner(@RequestBody Owner owner)
	{
		return vendorservice.registerOwner(owner);

	}

	@PostMapping("/login")
	public ResponseEntity<Owner> loginOwner(@RequestBody Owner owner)
	{
		Owner value = vendorservice.loginOwner(owner);
		if(value!=null)
			return new ResponseEntity(value, HttpStatus.OK);
		else
			return new ResponseEntity("Wrong Username and Password", HttpStatus.FORBIDDEN);
	}

	@PutMapping
	public Owner updateOwner(@RequestBody Owner owner)
	{
		return vendorservice.updateOwner(owner);
	}//Ok


	@PatchMapping("/approve/{o_id}/{o_status}")
	public Owner approvevendor(@PathVariable("o_id") int o_id, @PathVariable("o_status") Boolean o_status)
	{
		return vendorservice.approveOwner(o_id, o_status);
	}


	@DeleteMapping("/{o_id}")
	public Boolean deleteOwner(@PathVariable int o_id)
	{
		boolean value=vendorservice.deleteOwner(o_id);
		if(value==true)
			return true;
		else
			return false;
	}

	@GetMapping("/{o_id}")
	public Owner singleOwner(@PathVariable int o_id)
	{
		return vendorservice.getOwner(o_id);
	}

	@GetMapping
	public List<Owner> allOwner()
	{
		return vendorservice.allOwner();
	}
	 
}
