package com.repository;

import com.entities.Owner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Transactional

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Integer>
{
	@Query(value="select * from Owner where email=?1 AND password=?2",nativeQuery = true)
    Owner findByEmail(String email, String password);

}
