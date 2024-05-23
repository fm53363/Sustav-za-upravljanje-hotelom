package com.suh.suhbackend.repository;

import com.suh.suhbackend.entitiy.Soba;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SobaRepository extends JpaRepository<Soba, Integer> {
}
