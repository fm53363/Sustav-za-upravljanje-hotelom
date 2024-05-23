package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Gost;
import com.suh.suhbackend.repository.GostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GostService {

    @Autowired
    private GostRepository gostRepository;

    public List<Gost> listaGost() {
        return gostRepository.findAll();
    }

    public Optional<Gost> getGost(int id) {
        return gostRepository.findById(id);
    }
}
