package com.suh.suhbackend.repository;

import com.suh.suhbackend.entitiy.Rezervacija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDate;
import java.util.List;

@Repository
public interface RezervacijaRepository extends JpaRepository<Rezervacija,Integer> {

    List<Rezervacija> findByIdGost(int idGost);

    @Query("SELECT r FROM Rezervacija r WHERE r.idGost = :idGost AND r.datumOdlaska >= :currentDate")
    List<Rezervacija> findFutureReservationsByIdGost(@Param("idGost") int idGost, @Param("currentDate") LocalDate currentDate);
}
