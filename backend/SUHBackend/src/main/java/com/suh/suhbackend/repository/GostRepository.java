package com.suh.suhbackend.repository;

import com.suh.suhbackend.entitiy.Gost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GostRepository  extends JpaRepository<Gost, Integer> {
}
