package com.suh.suhbackend.utils;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.Objects;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RezervacijaSobaId  implements Serializable {

    private  Integer sifraRezervacije;
    private  Integer idSoba;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        RezervacijaSobaId that = (RezervacijaSobaId) o;
        return Objects.equals(sifraRezervacije, that.sifraRezervacije) && Objects.equals(idSoba, that.idSoba);
    }

    @Override
    public int hashCode() {
        return Objects.hash(sifraRezervacije, idSoba);
    }

}
