package com.entities;


import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Table
@Entity
public class Property {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	private String name;

	@Column(columnDefinition = "TEXT")
	private String description;

	private float rent;

	private float deposite;

	private String imageUrl;

	private String address;
	private String city;
	private String area;

	private String noOfBalconies;
	private boolean isAvailable;
	private Timestamp timestamp;

	@ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinColumn(name = "owner_id")
	private Owner owner;

	@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinTable(
			name="properties_categories",
			joinColumns = {
					@JoinColumn(name = "property_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name = "category_id")
			}
	)
	@ReadOnlyProperty
	private Set<Category> categories = new HashSet<>();


	@ManyToMany(cascade = {CascadeType.MERGE, CascadeType.PERSIST,CascadeType.REFRESH})
	@JoinTable(
			name="properties_intrested_user",
			joinColumns = {
					@JoinColumn(name = "property_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name = "user_id")
			}
	)
	private Set<User> intrestedUser = new HashSet<>();


	public Property() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String pname) {
		this.name = pname;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String pdesc) {
		this.description = pdesc;
	}


	public float getRent() {
		return rent;
	}

	public void setRent(float pprice) {
		this.rent = pprice;
	}

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Set<Category> getCategories() {
		return categories;
	}

	public void setCategories(Set<Category> categories) {
		this.categories = categories;
	}

	public void addCategories(Category category) {
		this.categories.add(category);
	}

	public float getDeposite() {
		return deposite;
	}

	public void setDeposite(float deposite) {
		this.deposite = deposite;
	}

	public Owner getOwner() {
		return owner;
	}

	public void setOwner(Owner owner) {
		this.owner = owner;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getArea() {
		return area;
	}

	public void setArea(String area) {
		this.area = area;
	}

	public Set<User> getIntrestedUser() {
		return intrestedUser;
	}

	public void setIntrestedUser(Set<User> intrestedUser) {
		this.intrestedUser = intrestedUser;
	}

	public void addIntrestedUser(User intrestedUser) {
		this.intrestedUser.add(intrestedUser);
	}

	public void removeIntrestedUser(User intrestedUser) {
		this.intrestedUser.remove(intrestedUser);
	}

	public String getNoOfBalconies() {
		return noOfBalconies;
	}

	public void setNoOfBalconies(String noOfBalconies) {
		this.noOfBalconies = noOfBalconies;
	}

	public boolean isAvailable() {
		return isAvailable;
	}

	public void setAvailable(boolean available) {
		isAvailable = available;
	}

	public Timestamp getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Timestamp timestamp) {
		this.timestamp = timestamp;
	}
}
