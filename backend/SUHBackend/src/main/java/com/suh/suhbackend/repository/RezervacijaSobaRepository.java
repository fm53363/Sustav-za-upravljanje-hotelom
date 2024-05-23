package com.suh.suhbackend.repository;

import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.utils.RezervacijaSobaId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RezervacijaSobaRepository extends JpaRepository<RezervacijaSoba, RezervacijaSobaId> {
}
