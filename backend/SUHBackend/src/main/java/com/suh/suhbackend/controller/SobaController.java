package com.suh.suhbackend.controller;

import com.suh.suhbackend.entitiy.Soba;
import com.suh.suhbackend.repository.SobaRepository;
import com.suh.suhbackend.service.SobaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/soba")
public class SobaController {

    @Autowired
    private SobaService sobaService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Soba>> getAllSoba() {
        return new ResponseEntity<List<Soba>>(sobaService.listaSoba(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Soba>> getSobaById(@PathVariable int id) {
        return new ResponseEntity<Optional<Soba>>(sobaService.getSoba(id), HttpStatus.OK);
    }


}
