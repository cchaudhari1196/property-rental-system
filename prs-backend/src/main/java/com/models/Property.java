package com.models;

import java.sql.Timestamp;
import java.util.List;

public class Property {
    private List<Integer> categoryIds;
    private Integer rent;
    private Integer deposite;
    private String imageUrl;
    private Integer ownerId;
    private String name;
    private String desc;
    private String address;
    private String city;
    private String area;
    private String noOfBalconies;
    private boolean isAvailable;
    private Timestamp timestamp;

    public String getNoOfBalconies() {
        return noOfBalconies;
    }

    public void setNoOfBalconies(String noOfBalconies) {
        this.noOfBalconies = noOfBalconies;
    }

    public List<Integer> getCategoryIds() {
        return categoryIds;
    }

    public void setCategoryIds(List<Integer> categoryIds) {
        this.categoryIds = categoryIds;
    }

    public Integer getRent() {
        return rent;
    }

    public void setRent(Integer rent) {
        this.rent = rent;
    }

    public Integer getDeposite() {
        return deposite;
    }

    public void setDeposite(Integer deposite) {
        this.deposite = deposite;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public Integer getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Integer ownerId) {
        this.ownerId = ownerId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
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
}
