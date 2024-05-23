package com.suh.suhbackend.entitiy;

import jakarta.persistence.*;
import lombok.*;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "gost")
public class Gost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idGost;

    private String ime;
    private String prezime;
    private String email;
}
