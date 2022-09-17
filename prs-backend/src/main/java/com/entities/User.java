package com.entities;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class User {

	@Id
	@GeneratedValue
	private int id;
	
	private String fname;
	private String lname;
	private String phone;
	private String address;
	private String email;
	private String password;


	@ManyToMany(mappedBy = "intrestedUser", cascade = { CascadeType.ALL })
	private Set<Property> properties;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	


	public User(int id, String fname, String lname, String phone, String address, String u_email,
				String password, float wallet) {
		super();
		this.id = id;
		this.fname = fname;
		this.lname = lname;
		this.phone = phone;
		this.address = address;
		this.email = u_email;
		this.password = password;
	}


	public int getId() {
		return id;
	}

	public void setId(int u_id) {
		this.id = u_id;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String u_phone) {
		this.phone = u_phone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String u_address) {
		this.address = u_address;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String u_email) {
		this.email = u_email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String u_password) {
		this.password = u_password;
	}



	public String getFname() {
		return fname;
	}

	public void setFname(String u_fname) {
		this.fname = u_fname;
	}

	public String getLname() {
		return lname;
	}

	public void setLname(String u_lname) {
		this.lname = u_lname;
	}

	public Set<Property> getProperties() {
		return properties;
	}

	public void setProperties(Set<Property> properties) {
		this.properties = properties;
	}
}
