package com.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Table
@Entity
public class Admin 
{
   @Id
   @GeneratedValue
   private int id;
   
   private String password;
   private String phone;
   private String email;
   
   public Admin() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Admin(int id, String password, String phone, String email, float a_wallet) {
		super();
		this.id = id;
		this.password = password;
		this.phone = phone;
		this.email = email;
	}

	public int getId() {
		return id;
	}

	public void setId(int a_id) {
		this.id = a_id;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String a_password) {
		this.password = a_password;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String a_phone) {
		this.phone = a_phone;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String a_email) {
		this.email = a_email;
	}

}
