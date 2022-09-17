package com.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Table
@Entity
public class Property {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int p_id;
	
	private String pname;

	@Column(columnDefinition = "TEXT")
	private String pdesc;

	private float rent;

	private float deposite;

	private String imageUrl;

	private String address;
	private String city;
	private String area;

	private String noOfBalconies;
	private boolean isAvailable;
	private Timestamp timestamp;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "v_id")
//	@JsonProperty(access = Access.WRITE_ONLY)
	private Owner owner;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name="products_categories",
			joinColumns = {
					@JoinColumn(name = "p_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name = "c_id")
			}
	)
	@ReadOnlyProperty
	private Set<Category> categories = new HashSet<>();


	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(
			name="products_intrested_user",
			joinColumns = {
					@JoinColumn(name = "p_id")
			},
			inverseJoinColumns = {
					@JoinColumn(name = "u_id")
			}
	)
	@ReadOnlyProperty
	private Set<User> intrestedUser = new HashSet<>();


	public Property() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getP_id() {
		return p_id;
	}

	public void setP_id(int p_id) {
		this.p_id = p_id;
	}

	public String getPname() {
		return pname;
	}

	public void setPname(String pname) {
		this.pname = pname;
	}

	public String getPdesc() {
		return pdesc;
	}

	public void setPdesc(String pdesc) {
		this.pdesc = pdesc;
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
