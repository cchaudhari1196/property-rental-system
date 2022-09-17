package com.entities;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class User {

	@Id
	@GeneratedValue
	private int u_id;
	
	private String u_fname;
	private String u_lname;
	private String u_phone;
	private String u_address;
	private String u_email;
	private String u_password;


	@ManyToMany(mappedBy = "intrestedUser", cascade = { CascadeType.ALL })
	private Set<Property> properties;
	
	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	


	public User(int u_id, String u_fname, String u_lname, String u_phone, String u_address, String u_email,
			String u_password, float wallet) {
		super();
		this.u_id = u_id;
		this.u_fname = u_fname;
		this.u_lname = u_lname;
		this.u_phone = u_phone;
		this.u_address = u_address;
		this.u_email = u_email;
		this.u_password = u_password;
	}


	public int getU_id() {
		return u_id;
	}

	public void setU_id(int u_id) {
		this.u_id = u_id;
	}

	public String getU_phone() {
		return u_phone;
	}

	public void setU_phone(String u_phone) {
		this.u_phone = u_phone;
	}

	public String getU_address() {
		return u_address;
	}

	public void setU_address(String u_address) {
		this.u_address = u_address;
	}

	public String getU_email() {
		return u_email;
	}

	public void setU_email(String u_email) {
		this.u_email = u_email;
	}

	public String getU_password() {
		return u_password;
	}

	public void setU_password(String u_password) {
		this.u_password = u_password;
	}

	@Override
	public String toString() {
		return "User [u_id=" + u_id + ", u_fname=" + u_fname + ", u_lname=" + u_lname + ", u_phone=" + u_phone
				+ ", u_address=" + u_address + ", u_email=" + u_email + ", u_password=" + u_password
				 + "]";
	}


	public String getU_fname() {
		return u_fname;
	}

	public void setU_fname(String u_fname) {
		this.u_fname = u_fname;
	}

	public String getU_lname() {
		return u_lname;
	}

	public void setU_lname(String u_lname) {
		this.u_lname = u_lname;
	}

	public Set<Property> getProperties() {
		return properties;
	}

	public void setProperties(Set<Property> properties) {
		this.properties = properties;
	}
}
