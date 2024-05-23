package com.suh.suhbackend.entitiy;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "rezervacija")
public class Rezervacija {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer sifraRezervacije;

    private LocalDate datumDolaska;
    private LocalDate datumOdlaska;
    private Integer idGost;

}
