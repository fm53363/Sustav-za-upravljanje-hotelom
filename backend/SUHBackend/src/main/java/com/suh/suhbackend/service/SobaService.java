package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Soba;
import com.suh.suhbackend.repository.SobaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SobaService {

    @Autowired
    private SobaRepository sobaRepository;

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
}
