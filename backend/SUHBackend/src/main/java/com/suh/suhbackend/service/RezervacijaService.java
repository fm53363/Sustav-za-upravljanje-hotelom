package com.suh.suhbackend.service;

import com.suh.suhbackend.entitiy.Rezervacija;
import com.suh.suhbackend.entitiy.RezervacijaSoba;
import com.suh.suhbackend.repository.RezervacijaRepository;
import com.suh.suhbackend.repository.RezervacijaSobaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;

import java.util.List;
import java.util.Optional;


@Service
public class RezervacijaService {

    @Autowired
    private RezervacijaRepository rezervacijaRepository;

    @Autowired
    private RezervacijaSobaRepository rezervacijaSobaRepository;

    public List<Rezervacija> listaRezervacija() {
        return rezervacijaRepository.findAll();
    }

    public Optional<Rezervacija> getRezervacija(int id) {
        return rezervacijaRepository.findById(id);
    }

    public void deleteRezervacija(int id) {
        rezervacijaRepository.deleteById(id);
    }

    public Rezervacija updateRezervacija(int id, Rezervacija rezervacijaDetails) {
        Rezervacija rezervacija = rezervacijaRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        // Check for date conflicts for all rooms associated with this reservation
        List<Integer> idSobaList = rezervacijaSobaRepository.findBySifraRezervacije(id).stream()
                .map(RezervacijaSoba::getIdSoba)
                .toList();

        List<RezervacijaSoba> reservationRoomsAll = rezervacijaSobaRepository.findAll();

        List<Rezervacija> reservationsAll = rezervacijaRepository.findAll().stream()
                .filter(rezervacija1 -> rezervacija1.getSifraRezervacije() != id )
                .toList();

        for (Rezervacija rezervacijaTemp : reservationsAll) {
            for (RezervacijaSoba soba : reservationRoomsAll) {
                if(idSobaList.contains(soba.getIdSoba())){
                    if (haveDateCollision(
                            rezervacijaDetails.getDatumDolaska(),
                            rezervacijaDetails.getDatumOdlaska(),
                            rezervacijaTemp.getDatumDolaska(),
                            rezervacijaTemp.getDatumOdlaska())) {
                        throw new ResponseStatusException(HttpStatus.CONFLICT,
                                "Date conflict for room with id " + soba.getIdSoba());
                    }
                }
            }
        }

        rezervacija.setDatumDolaska(rezervacijaDetails.getDatumDolaska());
        rezervacija.setDatumOdlaska(rezervacijaDetails.getDatumOdlaska());
        return rezervacijaRepository.save(rezervacija);
    }

    public Rezervacija createRezervacija(Rezervacija rezervacija) {
        return rezervacijaRepository.save(rezervacija);
    }

    public List<Rezervacija> getRezervacijaByGostId(int gostId) {
        return rezervacijaRepository.findByIdGost(gostId);
    }

    private static boolean haveDateCollision(LocalDate start1, LocalDate end1, LocalDate start2, LocalDate end2) {
        return (start1.isBefore(end2) || start1.isEqual(end2)) && (start2.isBefore(end1) || start2.isEqual(end1));
    }


}
