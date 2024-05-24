package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Rezervacija;
import com.suh.suhbackend.repository.RezervacijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RezervacijaService {

    @Autowired
    private RezervacijaRepository rezervacijaRepository;

    public List<Rezervacija> listaRezervacija() {
        return rezervacijaRepository.findAll();
    }

    public Optional<Rezervacija> getRezervacija(int id) {
        return rezervacijaRepository.findById(id);
    }

    public Rezervacija createRezervacija(Rezervacija rez) {
        return rezervacijaRepository.save(rez);
    }

    public void deleteRezervacija(int id) {
        rezervacijaRepository.deleteById(id);
    }

    public Rezervacija updateRezervacija(int id, Rezervacija rez) {
        Optional<Rezervacija> oldRezervacija = rezervacijaRepository.findById(id);
        if (oldRezervacija.isPresent()) {
            oldRezervacija.get().setDatumOdlaska(rez.getDatumOdlaska());
            oldRezervacija.get().setDatumOdlaska(rez.getDatumDolaska());
            return rezervacijaRepository.save(oldRezervacija.get());
        }
        throw new ResponseStatusException(HttpStatus.NOT_FOUND);
    }


}
