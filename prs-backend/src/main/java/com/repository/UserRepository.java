package com.repository;

import com.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional

@Repository
public interface UserRepository extends JpaRepository<User, Integer> 
{
	@Query(value="select * from User  WHERE email=? AND password=?",nativeQuery = true)
	User findByEmail(String email, String password);

}
