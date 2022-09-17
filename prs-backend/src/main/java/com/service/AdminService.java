package com.service;

import com.entities.Admin;
import com.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
@Service
public class AdminService
{
	@Autowired
	private AdminRepository adminrepo;
	
	public ResponseEntity loginAdmin(Admin admin)
	{
		// TODO Auto-generated method stub
		Admin admin1=adminrepo.findByEmail(admin.getEmail(),admin.getPassword());
		
		if(admin1!= null && admin1.getEmail().equals(admin.getEmail())&&admin1.getPassword().equals(admin.getPassword()))
			return new ResponseEntity<Admin>(admin1,HttpStatus.ACCEPTED);
		else
				return new ResponseEntity<String>("Wrong Username and Password",HttpStatus.FORBIDDEN);
	}	

}

