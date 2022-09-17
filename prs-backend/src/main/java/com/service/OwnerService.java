package com.service;

import com.entities.Owner;
import com.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerService
{
	@Autowired
	private OwnerRepository vendorrepo;

	//register
	public Owner registerVendor(Owner owner)
	{
		// TODO Auto-generated method stub
			return vendorrepo.save(owner);
	}

	//login
	public Owner loginVendor(Owner owner)
	{
		// TODO Auto-generated method stub
		
		Owner owner1 =vendorrepo.findByEmail(owner.getV_email(), owner.getV_password());
		
		if(owner1 !=null && owner1.getV_email().equals(owner.getV_email())&& owner1.getV_password().equals(owner.getV_password()))
			return owner1;
		else
				return null;
	}
	
	//update
	public Owner updateVendor(Owner owner) {
		// TODO Auto-generated method stub
		Owner existingvendor;
		existingvendor=vendorrepo.findById(owner.getV_id()).orElse(null);
		existingvendor.setV_name(owner.getV_name());
		existingvendor.setV_phone(owner.getV_phone());
		existingvendor.setV_email(owner.getV_email());
		existingvendor.setV_password(owner.getV_password());
		existingvendor.setV_address(owner.getV_address());
		
		return vendorrepo.save(existingvendor);
	}


	public boolean deleteVendor(int v_id) {
		// TODO Auto-generated method stub
		
		vendorrepo.deleteById(v_id);
		return true;
		
	}


	public Owner getVendor(int v_id) {
		// TODO Auto-generated method stub
		return vendorrepo.findById(v_id).orElse(null);
	}


	public java.util.List<Owner> allVendor() {
		// TODO Auto-generated method stub
		return vendorrepo.findAll();
	}

	public Owner approveVendor(int v_id, Boolean v_status) {
		Owner owner = vendorrepo.findById(v_id).orElse(null);
		if(owner != null){
			owner.setV_status(v_status);
			return vendorrepo.save(owner);
		}
		return null;
	}
}

