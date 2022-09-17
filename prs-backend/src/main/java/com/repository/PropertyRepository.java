package com.repository;

import com.entities.Property;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
@Transactional
public interface PropertyRepository extends JpaRepository<Property, Integer> {

	@Query(value = "select p from Property p join p.categories c where c.c_name=?1")
	public List<Property> getByCategoryName(String name);

	@Query(value = "select p from Property p join p.categories c where c.c_id=?1")
	public List<Property> getByCategoryId(int cId);

	@Query(value = "select * from property where pname=?1 or pdesc=?2", nativeQuery = true)
	public List<Property> searchbykeyword(String pname, String pdesc);

	@Query(value = "select * from property where v_id =?1", nativeQuery = true)
	public List<Property> getByVid(int v_id);

	@Modifying
	@Query(value = "delete from property where p_id=?1", nativeQuery = true)
	public void productdel(int p_id);

}
