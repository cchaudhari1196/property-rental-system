package com.controller;

import com.entities.Admin;
import com.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RequestMapping("/admin")
@RestController
public class AdminController {
	@Autowired
	AdminService aservice;

	@PostMapping("/adminlogin")
	public ResponseEntity loginAdmin(@RequestBody Admin admin)
	{
			return aservice.loginAdmin(admin);
	}

}
