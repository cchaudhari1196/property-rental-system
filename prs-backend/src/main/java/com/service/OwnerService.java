package com.service;

import com.entities.Owner;
import com.repository.OwnerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OwnerService
{
	@Autowired
	private OwnerRepository ownerRepository;

	//register
	public Owner registerOwner(Owner owner)
	{
		// TODO Auto-generated method stub
			return ownerRepository.save(owner);
	}

	//login
	public Owner loginOwner(Owner owner)
	{
		// TODO Auto-generated method stub
		
		Owner owner1 = ownerRepository.findByEmail(owner.getEmail(), owner.getPassword());
		
		if(owner1 !=null && owner1.getEmail().equals(owner.getEmail())&& owner1.getPassword().equals(owner.getPassword()))
			return owner1;
		else
				return null;
	}
	
	//update
	public Owner updateOwner(Owner owner) {
		// TODO Auto-generated method stub
		Owner existingowner;
		existingowner= ownerRepository.findById(owner.getId()).orElse(null);
		existingowner.setName(owner.getName());
		existingowner.setPhone(owner.getPhone());
		existingowner.setEmail(owner.getEmail());
		existingowner.setPassword(owner.getPassword());
		existingowner.setAddress(owner.getAddress());
		
		return ownerRepository.save(existingowner);
	}


	public boolean deleteOwner(int v_id) {
		// TODO Auto-generated method stub
		
		ownerRepository.deleteById(v_id);
		return true;
		
	}


	public Owner getOwner(int v_id) {
		// TODO Auto-generated method stub
		return ownerRepository.findById(v_id).orElse(null);
	}


	public java.util.List<Owner> allOwner() {
		// TODO Auto-generated method stub
		return ownerRepository.findAll();
	}

	public Owner approveOwner(int v_id, Boolean v_status) {
		Owner owner = ownerRepository.findById(v_id).orElse(null);
		if(owner != null){
			owner.setStatus(v_status);
			return ownerRepository.save(owner);
		}
		return null;
	}
}

