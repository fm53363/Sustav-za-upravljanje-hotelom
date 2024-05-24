package com.suh.suhbackend.controller;

import com.suh.suhbackend.entitiy.Gost;

import com.suh.suhbackend.service.GostService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/gost")
public class GostController {

    @Autowired
    private GostService gostService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Gost>> getAllGost() {
        return new ResponseEntity<>(gostService.listaGost(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gost>> getGostById(@PathVariable int id) {
        return new ResponseEntity<>(gostService.getGost(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Gost> updateGost(@PathVariable int id, @RequestBody Gost gostDetails) {
        return ResponseEntity.ok(gostService.updateGost(id, gostDetails));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGost(@PathVariable int id) {
        gostService.deleteGost(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping
    public ResponseEntity<Gost> createGost(@RequestBody Gost gost) {
        return ResponseEntity.ok(gostService.createGost(gost));
    }

}

