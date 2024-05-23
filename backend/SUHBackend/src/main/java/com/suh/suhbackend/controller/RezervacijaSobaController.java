package com.suh.suhbackend.controller;

import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.service.RezervacijaSobaService;
import com.suh.suhbackend.utils.RezervacijaSobaId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/rezervacijasoba")
public class RezervacijaSobaController {

    @Autowired
    private RezervacijaSobaService rezervacijaSobaService;

    @GetMapping("/getAll")
    public List<RezervacijaSoba> getAll() {
        return rezervacijaSobaService.findAll();
    }

    @GetMapping("/{sifraRezervacije}/{idSoba}")
    public Optional<RezervacijaSoba> getRezervacijaSobaById(@PathVariable Integer sifraRezervacije, @PathVariable Integer idSoba) {
        return rezervacijaSobaService.findById(new RezervacijaSobaId(sifraRezervacije, idSoba));
    }
}
