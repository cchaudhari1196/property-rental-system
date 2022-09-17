package com.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Entity
public class Owner {

	@Id
	@GeneratedValue
	private int id;
	
	private String name;
	private long phone;
	private String address;
	private String email;
	private String password;
	private Boolean status = false;
	
	public Owner() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Owner(int id, String name, long phone, String address, String email, String password) {
		super();
		this.id = id;
		this.name = name;
		this.phone = phone;
		this.address = address;
		this.email = email;
		this.password = password;
		this.status = false;
	}

	public int getId() {
		return id;
	}

	public void setId(int v_id) {
		this.id = v_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String v_name) {
		this.name = v_name;
	}

	public long getPhone() {
		return phone;
	}

	public void setPhone(long v_phone) {
		this.phone = v_phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String v_address) {
		this.address = v_address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String v_email) {
		this.email = v_email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String v_password) {
		this.password = v_password;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean v_status) {
		this.status = v_status;
	}


}
