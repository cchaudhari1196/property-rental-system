package com.repository;

import com.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PropertyRepository extends JpaRepository<Property, Integer> {

	@Query(value = "select p from Property p join p.categories c where c.name=?1")
	public List<Property> getByCategoryName(String name);

	@Query(value = "select p from Property p join p.categories c where c.id=?1")
	public List<Property> getByCategoryId(int cId);

	@Query(value = "select * from property where pname=?1 or pdesc=?2", nativeQuery = true)
	public List<Property> searchbykeyword(String pname, String pdesc);

	@Query(value = "select * from property where owner_id =?1", nativeQuery = true)
	public List<Property> getByOwnerid(int ownerId);

	@Modifying
	@Query(value = "delete from property where id=?1", nativeQuery = true)
	public void productdel(int p_id);

	public List<Property> findByCityEqualsIgnoreCase(String city);

	@Query(value = "select p from Property p join p.intrestedUser u where u.id=?1")
	public List<Property> getPropertiesByIntrestedUser(Integer user_id);


	@Query(value = "select distinct p.city from Property p")
	public List<String> getCityList();

}
