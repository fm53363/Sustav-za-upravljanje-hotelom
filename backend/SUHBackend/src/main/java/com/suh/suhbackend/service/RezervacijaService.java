package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Rezervacija;
import com.suh.suhbackend.repository.RezervacijaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}
