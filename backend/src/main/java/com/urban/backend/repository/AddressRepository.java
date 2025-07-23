package com.urban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.urban.backend.model.Address;
@Repository
public interface AddressRepository extends JpaRepository<Address, Long>{
}
