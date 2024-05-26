package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.repository.RezervacijaSobaRepository;
import com.suh.suhbackend.utils.RezervacijaSobaId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Service
public class RezervacijaSobaService {

    @Autowired
    private RezervacijaSobaRepository repo;

    public List<RezervacijaSoba> findAll() {
        return repo.findAll();
    }

    public Optional<RezervacijaSoba> findById(RezervacijaSobaId rezervacijaSobaId) {
        return repo.findById(rezervacijaSobaId);
    }

    public void deleteRezervacijaSoba(RezervacijaSobaId rezervacijaSobaId) {
        repo.deleteById(rezervacijaSobaId);
    }

    public RezervacijaSoba updateRezervacijaSoba(RezervacijaSobaId rezervacijaSobaId, RezervacijaSoba rezervacijaSoba) {
        RezervacijaSoba rezervacijaSoba1 = repo.findById(rezervacijaSobaId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));;

        rezervacijaSoba1.setBrojGostiju(rezervacijaSoba.getBrojGostiju());
        rezervacijaSoba1.setCijenaNoci(rezervacijaSoba.getCijenaNoci());
        rezervacijaSoba1.setSpecijalniZahtjevi(rezervacijaSoba.getSpecijalniZahtjevi());
        rezervacijaSoba1.setIdSoba(rezervacijaSoba.getIdSoba());
        return repo.save(rezervacijaSoba1);
    }

    public RezervacijaSoba createRezervacijaSoba(RezervacijaSoba rezervacija) {
        return repo.save(rezervacija);
    }
}
