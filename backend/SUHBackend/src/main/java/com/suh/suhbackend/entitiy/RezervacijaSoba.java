package com.suh.suhbackend.entitiy;

import com.suh.suhbackend.utils.RezervacijaSobaId;
import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rezervacijasoba")
@IdClass(RezervacijaSobaId.class)
public class RezervacijaSoba {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sifraRezervacije;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSoba;

    private BigDecimal cijenaNoci;
    private Integer brojGostiju;
    private String specijalniZahtjevi;
}
