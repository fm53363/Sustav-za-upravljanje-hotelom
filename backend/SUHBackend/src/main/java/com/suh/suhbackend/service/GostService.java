package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Gost;
import com.suh.suhbackend.entitiy.Rezervacija;
import com.suh.suhbackend.repository.GostRepository;
import com.suh.suhbackend.repository.RezervacijaRepository;
import org.slf4j.ILoggerFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import java.time.LocalDate;
import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class GostService {

    private static final Logger logger = LoggerFactory.getLogger(GostService.class);

    @Autowired
    private GostRepository gostRepository;

    @Autowired
    private RezervacijaRepository rezervacijaRepository;

    public List<Gost> listaGost() {
        return gostRepository.findAll();
    }

    public Optional<Gost> getGost(int id) {
        return gostRepository.findById(id);
    }


    public Gost updateGost(int id, Gost gost) {
        Optional<Gost> oldGost = gostRepository.findById(id);
        if ((!Objects.equals(oldGost.get().getEmail(), gost.getEmail())) && gostRepository.existsByEmail(gost.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        oldGost.get().setEmail(gost.getEmail());
        oldGost.get().setIme(gost.getIme());
        oldGost.get().setPrezime(gost.getPrezime());
        return gostRepository.save(oldGost.get());
    }

    public void deleteGost(int idGost) {
        // Check for future reservations
        List<Rezervacija> futureReservations = rezervacijaRepository.findFutureReservationsByIdGost(idGost, LocalDate.now());
        logger.info("Rezervacije: {}", futureReservations);
        if (!futureReservations.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT ,"Cannot delete guest with future reservations.");
        }
        gostRepository.deleteById(idGost);
    }

    public Gost createGost(Gost gost) {
        if (gostRepository.existsByEmail(gost.getEmail())){
            throw new ResponseStatusException(HttpStatus.CONFLICT ,"Email already exists.");
        }
        return gostRepository.save(gost);
    }
}
