package com.suh.suhbackend.repository;

import com.suh.suhbackend.entitiy.Rezervacija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RezervacijaRepository extends JpaRepository<Rezervacija,Integer> {
}
