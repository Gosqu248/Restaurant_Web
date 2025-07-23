package com.urban.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.urban.backend.model.UserSecurity;
@Repository
public interface UserSecurityRepository extends JpaRepository<UserSecurity, Long> {

}
