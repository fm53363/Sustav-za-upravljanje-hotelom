package com.suh.suhbackend.controller;

import com.suh.suhbackend.entitiy.Rezervacija;

import com.suh.suhbackend.service.RezervacijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/rezervacija")
public class RezervacijaController {

    @Autowired
    private RezervacijaService rezervacijaService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Rezervacija>> getAllRezervacija() {
        return new ResponseEntity<>(rezervacijaService.listaRezervacija(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Rezervacija>> getRezervacijaById(@PathVariable int id) {
        return new ResponseEntity<>(rezervacijaService.getRezervacija(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Rezervacija> createRezervacija(@RequestBody Rezervacija rezervacija) {
        return ResponseEntity.ok(rezervacijaService.createRezervacija(rezervacija));
    }


}
