package com.repository;

import com.entities.Category;
import com.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Transactional

@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer> 
{
	@Query(value="select c from Category c WHERE c.c_categoryType=?1")
	List<Category> findCatergoryByType(String type);
}
