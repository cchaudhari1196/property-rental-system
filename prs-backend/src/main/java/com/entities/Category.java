package com.entities;

import javax.persistence.*;
import java.util.Set;

@Table
@Entity
public class Category {

	@Id
	@GeneratedValue
	private int id;

	private String name;

	private String categoryType;

	@ManyToMany(mappedBy = "categories", cascade = { CascadeType.ALL })
	private Set<Property> properties;

	public Category() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Category(String name) {
		super();
		this.name = name;
	}
	public int getId() {
		return id;
	}
	public void setId(int c_id) {
		this.id = c_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String c_name) {
		this.name = c_name;
	}

	@Override
	public String toString() {
		return "Category [c_id=" + id + "]";
	}

	public String getCategoryType() {
		return categoryType;
	}

	public void setCategoryType(String c_categoryType) {
		this.categoryType = c_categoryType;
	}

	public Set<Property> getProperties() {
		return properties;
	}

	public void setProperties(Set<Property> properties) {
		this.properties = properties;
	}
}

