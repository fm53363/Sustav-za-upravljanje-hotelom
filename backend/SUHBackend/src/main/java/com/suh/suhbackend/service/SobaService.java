package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Rezervacija;
import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.entitiy.Soba;
import com.suh.suhbackend.repository.RezervacijaRepository;
import com.suh.suhbackend.repository.RezervacijaSobaRepository;
import com.suh.suhbackend.repository.SobaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SobaService {

    @Autowired
    private SobaRepository sobaRepository;

    @Autowired
    private RezervacijaRepository rezervacijaRepository;

    @Autowired
    private RezervacijaSobaRepository rezervacijaSobaRepository;

    public List<Soba> listaSoba() {
        return sobaRepository.findAll();
    }

    public Optional<Soba> getSoba(int id) {
        return sobaRepository.findById(id);
    }

    public Soba saveSoba(Soba soba) {
        return sobaRepository.save(soba);
    }

    public void deleteSoba(int id) {
        sobaRepository.deleteById(id);
    }

    public List<Soba> dostupneSobe(int idRezervacija) {
        Rezervacija rezervacija = rezervacijaRepository.findById(idRezervacija).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<RezervacijaSoba> allRezervacijaSoba = rezervacijaSobaRepository.findAll();
        List<Soba> dostupneSoba = new ArrayList<>();

        for(RezervacijaSoba rezSoba: allRezervacijaSoba) {
            Rezervacija rezervacijaTemp = rezervacijaRepository.findById(rezSoba.getSifraRezervacije()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
            if(!haveDateCollision(rezervacijaTemp.getDatumDolaska(), rezervacijaTemp.getDatumOdlaska(), rezervacija.getDatumDolaska(), rezervacijaTemp.getDatumOdlaska())) {
                dostupneSoba.add(sobaRepository.findById(rezSoba.getIdSoba()).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND)));
            }
        }
        return dostupneSoba;

    }

    private static boolean haveDateCollision(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        return (start1.isBefore(end2) || start1.isEqual(end2)) && (start2.isBefore(end1) || start2.isEqual(end1));
    }
}
