package com.suh.suhbackend.entitiy;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "soba")
public class Soba {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idSoba;

    private String tipSobe;
    private BigDecimal cijena;
    private Integer dostupnost;
    private Integer brojSobe;

}
