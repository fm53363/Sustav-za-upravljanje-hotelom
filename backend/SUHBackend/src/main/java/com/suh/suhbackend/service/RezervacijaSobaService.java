package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.repository.RezervacijaSobaRepository;
import com.suh.suhbackend.utils.RezervacijaSobaId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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


}
