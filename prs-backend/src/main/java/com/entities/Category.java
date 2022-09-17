package com.entities;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class Category {

	@Id
	@GeneratedValue
	private int c_id;

	private String c_name;

	private String c_categoryType;

	@ManyToMany(mappedBy = "categories", cascade = { CascadeType.ALL })
	private Set<Property> properties;

	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(String c_name) {
		super();
		this.c_name = c_name;
	}
	public int getC_id() {
		return c_id;
	}
	public void setC_id(int c_id) {
		this.c_id = c_id;
	}

	public String getC_name() {
		return c_name;
	}

	public void setC_name(String c_name) {
		this.c_name = c_name;
	}

	@Override
	public String toString() {
		return "Category [c_id=" + c_id  + "]";
	}

	public String getC_categoryType() {
		return c_categoryType;
	}

	public void setC_categoryType(String c_categoryType) {
		this.c_categoryType = c_categoryType;
	}

	public Set<Property> getProperties() {
		return properties;
	}

	public void setProperties(Set<Property> properties) {
		this.properties = properties;
	}
}

