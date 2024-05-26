CREATE TABLE Soba
(
    idSoba SERIAL PRIMARY KEY,
    tipSobe VARCHAR(50) NOT NULL,
    cijena NUMERIC(10, 2) NOT NULL,
    dostupnost INT NOT NULL,
    brojSobe INT NOT NULL UNIQUE
);

CREATE TABLE Gost
(
    idGost SERIAL PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Zaposlenik
(
    idZaposlenik SERIAL PRIMARY KEY,
    ime VARCHAR(50) NOT NULL,
    prezime VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE Menadzer
(
    idMenadzer SERIAL PRIMARY KEY,
    brojPodređenih INT NOT NULL,
    idZaposlenik INT NOT NULL,
    FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE Recepcionar
(
    idRecepcionar SERIAL PRIMARY KEY,
    radnoVrijeme INTERVAL NOT NULL,
    idZaposlenik INT NOT NULL,
    FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE
);

CREATE TABLE UredivanjeSoba
(
    idZaposlenik INT NOT NULL,
    idSoba INT NOT NULL,
    PRIMARY KEY (idZaposlenik, idSoba),
    FOREIGN KEY (idZaposlenik) REFERENCES Zaposlenik(idZaposlenik) ON DELETE CASCADE,
    FOREIGN KEY (idSoba) REFERENCES Soba(idSoba) ON DELETE CASCADE
);

CREATE TABLE Rezervacija
(
    sifraRezervacije SERIAL PRIMARY KEY,
    datumDolaska DATE NOT NULL,
    datumOdlaska DATE NOT NULL,
    idGost INT NOT NULL,
    FOREIGN KEY (idGost) REFERENCES Gost(idGost) ON DELETE CASCADE
);

CREATE TABLE Placanje
(
    sifraPlacanja SERIAL PRIMARY KEY,
    iznos NUMERIC(10, 2) NOT NULL,
    nacinPlacanja VARCHAR(50) NOT NULL,
    sifraRezervacije INT NOT NULL,
    idGost INT NOT NULL,
    FOREIGN KEY (sifraRezervacije) REFERENCES Rezervacija(sifraRezervacije) ON DELETE CASCADE,
    FOREIGN KEY (idGost) REFERENCES Gost(idGost) ON DELETE CASCADE
);

CREATE TABLE RezervacijaSoba
(
    sifraRezervacije INT NOT NULL,
    idSoba INT NOT NULL,
    cijenaNoci NUMERIC(10, 2),
    brojGostiju INT,
    specijalniZahtjevi TEXT,
    PRIMARY KEY (sifraRezervacije, idSoba),
    FOREIGN KEY (sifraRezervacije) REFERENCES Rezervacija(sifraRezervacije) ON DELETE CASCADE,
    FOREIGN KEY (idSoba) REFERENCES Soba(idSoba) ON DELETE CASCADE
);

-- Insert data into Soba table
INSERT INTO Soba (tipSobe, cijena, dostupnost, brojSobe) VALUES
                                                             ('Apartman', 251.75, 1, 100),
                                                             ('Jednokrevetna', 121.55, 0, 101),
                                                             ('Dvokrevetna', 189.45, 1, 102),
                                                             ('Jednokrevetna', 143.90, 0, 103),
                                                             ('Apartman', 295.60, 1, 104),
                                                             ('Dvokrevetna', 175.30, 1, 105),
                                                             ('Jednokrevetna', 110.45, 0, 106),
                                                             ('Apartman', 250.00, 1, 107),
                                                             ('Dvokrevetna', 190.85, 0, 108),
                                                             ('Jednokrevetna', 130.75, 1, 109),
                                                             ('Apartman', 265.95, 0, 110),
                                                             ('Dvokrevetna', 180.50, 1, 111),
                                                             ('Jednokrevetna', 125.60, 0, 112),
                                                             ('Apartman', 298.75, 1, 113),
                                                             ('Dvokrevetna', 170.20, 0, 114),
                                                             ('Jednokrevetna', 135.00, 1, 115),
                                                             ('Apartman', 260.30, 0, 116),
                                                             ('Dvokrevetna', 185.75, 1, 117),
                                                             ('Jednokrevetna', 129.40, 0, 118),
                                                             ('Apartman', 270.80, 1, 119);

-- Insert data into Zaposlenik table
INSERT INTO Zaposlenik (ime, prezime, email) VALUES
                                                 ('Ivan', 'Horvat', 'ivan.horvat@example.com'),
                                                 ('Ana', 'Kovačić', 'ana.kovacic@example.com'),
                                                 ('Marko', 'Marin', 'marko.marin@example.com'),
                                                 ('Petra', 'Novak', 'petra.novak@example.com'),
                                                 ('Luka', 'Barić', 'luka.baric@example.com'),
                                                 ('Sara', 'Ramić', 'sara.ramic@example.com'),
                                                 ('Matej', 'Filipović', 'matej.filipovic@example.com'),
                                                 ('Ivana', 'Perić', 'ivana.peric@example.com'),
                                                 ('Josip', 'Tomić', 'josip.tomic@example.com'),
                                                 ('Marija', 'Jurić', 'marija.juric@example.com'),
                                                 ('Nikola', 'Kralj', 'nikola.kralj@example.com'),
                                                 ('Martina', 'Blažević', 'martina.blazevic@example.com'),
                                                 ('Tomislav', 'Lovrić', 'tomislav.lovric@example.com'),
                                                 ('Maja', 'Vuković', 'maja.vukovic@example.com'),
                                                 ('Antun', 'Petrović', 'antun.petrovic@example.com'),
                                                 ('Lucija', 'Pavić', 'lucija.pavic@example.com'),
                                                 ('Hrvoje', 'Grgić', 'hrvoje.grgic@example.com'),
                                                 ('Dora', 'Šimić', 'dora.simic@example.com'),
                                                 ('Karlo', 'Stanić', 'karlo.stanic@example.com'),
                                                 ('Ivana', 'Milić', 'ivana.milic@example.com');

-- Insert data into Menadzer table
INSERT INTO Menadzer (brojPodređenih, idZaposlenik) VALUES
                                                        (3, 5),
                                                        (4, 8),
                                                        (2, 14),
                                                        (1, 19),
                                                        (5, 12);

-- Insert data into Recepcionar table
INSERT INTO Recepcionar (radnoVrijeme, idZaposlenik) VALUES
                                                         ('8 hours', 3),
                                                         ('6 hours', 7),
                                                         ('12 hours', 11),
                                                         ('7 hours', 16),
                                                         ('9 hours', 18);

-- Insert data into UredivanjeSoba table
INSERT INTO UredivanjeSoba (idZaposlenik, idSoba) VALUES
                                                      (2, 10),
                                                      (5, 7),
                                                      (8, 13),
                                                      (3, 1),
                                                      (10, 18),
                                                      (6, 15),
                                                      (14, 4),
                                                      (11, 11),
                                                      (7, 9),
                                                      (1, 3),
                                                      (9, 8),
                                                      (13, 20),
                                                      (12, 6),
                                                      (15, 14),
                                                      (16, 12),
                                                      (17, 17),
                                                      (18, 16),
                                                      (19, 5),
                                                      (4, 2),
                                                      (20, 19);

-- Insert data into Gost table
INSERT INTO Gost (ime, prezime, email) VALUES
                                           ('Marija', 'Petrović', 'marija.petrović@example.com'),
                                           ('Ivana', 'Knežević', 'ivana.knezevic@example.com'),
                                           ('Ante', 'Matić', 'ante.matic@example.com'),
                                           ('Lucija', 'Jurić', 'lucija.juric@example.com');

-- Insert data into Rezervacija table
INSERT INTO Rezervacija (datumDolaska, datumOdlaska, idGost) VALUES
                                                                 ('2024-07-21', '2024-07-25', 1),
                                                                 ('2024-08-07', '2024-08-12', 1),
                                                                 ('2024-09-14', '2024-09-20', 1),
                                                                 ('2024-06-15', '2024-06-22', 2),
                                                                 ('2024-07-08', '2024-07-14', 2),
                                                                 ('2024-08-10', '2024-08-15', 3),
                                                                 ('2024-09-09', '2024-09-13', 3),
                                                                 ('2024-10-12', '2024-10-17', 3),
                                                                 ('2024-11-14', '2024-11-18', 4),
                                                                 ('2024-12-04', '2024-12-08', 4);

-- Insert data into Placanje table
INSERT INTO Placanje (iznos, nacinPlacanja, sifraRezervacije, idGost) VALUES
                                                                          (534.75, 'Kartica', 1, 1),
                                                                          (145.80, 'Gotovina', 2, 1),
                                                                          (678.90, 'Online', 3, 1),
                                                                          (289.50, 'Gotovina', 4, 2),
                                                                          (150.70, 'Gotovina', 5, 2),
                                                                          (123.60, 'Online', 6, 3),
                                                                          (230.40, 'Kartica', 7, 3),
                                                                          (460.85, 'Online', 8, 3),
                                                                          (756.80, 'Kartica', 9, 4),
                                                                          (150.70, 'Gotovina', 10, 4);

-- Insert data into RezervacijaSoba table
INSERT INTO RezervacijaSoba (sifraRezervacije, idSoba, cijenaNoci, brojGostiju, specijalniZahtjevi) VALUES
                                                                                                        (1, 11, 100.0, 1, 'None'),
                                                                                                        (2, 2, 100.0, 2, 'Vegetarian meal'),
                                                                                                        (3, 5, 100.0, 2, 'Vegetarian meal'),
                                                                                                        (4, 8, 100.0, 2, 'Late check-out'),
                                                                                                        (5, 17, 100.0, 2, 'Extra bed'),
                                                                                                        (5, 18, 100.0, 2, 'None'),
                                                                                                        (6, 15, 100.0, 4, 'Late check-out'),
                                                                                                        (6, 16, 100.0, 4, 'None'),
                                                                                                        (7, 5, 100.0, 3, 'Extra bed'),
                                                                                                        (7, 20, 100.0, 2, 'Extra bed'),
                                                                                                        (8, 6, 100.0, 1, 'None'),
                                                                                                        (8, 10, 100.0, 1, 'None'),
                                                                                                        (9, 3, 100.0, 1, 'None'),
                                                                                                        (9, 4, 100.0, 1, 'None'),
                                                                                                        (9, 5, 100.0, 1, 'None'),
                                                                                                        (10, 14, 100.0, 2, 'Extra bed'),
                                                                                                        (10, 16, 100.0, 2, 'Late check-out'),
                                                                                                        (10, 18, 100.0, 2, 'None');
