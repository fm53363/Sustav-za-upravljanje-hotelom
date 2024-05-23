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
        return new ResponseEntity<List<Gost>>(gostService.listaGost(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Gost>> getGostById(@PathVariable int id) {
        return new ResponseEntity<Optional<Gost>>(gostService.getGost(id), HttpStatus.OK);
    }


}

