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
	@Query(value="select * from Vendor where v_email=?1 AND v_password=?2",nativeQuery = true)
    Owner findByEmail(String v_email, String v_password);

}
