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
    checkIn TIMESTAMP,
    checkOut TIMESTAMP,
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
                                                 ('ZIme1', 'ZPrezime1', 'zaposlenik1@example.com'),
                                                 ('ZIme2', 'ZPrezime2', 'zaposlenik2@example.com'),
                                                 ('ZIme3', 'ZPrezime3', 'zaposlenik3@example.com'),
                                                 ('ZIme4', 'ZPrezime4', 'zaposlenik4@example.com'),
                                                 ('ZIme5', 'ZPrezime5', 'zaposlenik5@example.com'),
                                                 ('ZIme6', 'ZPrezime6', 'zaposlenik6@example.com'),
                                                 ('ZIme7', 'ZPrezime7', 'zaposlenik7@example.com'),
                                                 ('ZIme8', 'ZPrezime8', 'zaposlenik8@example.com'),
                                                 ('ZIme9', 'ZPrezime9', 'zaposlenik9@example.com'),
                                                 ('ZIme10', 'ZPrezime10', 'zaposlenik10@example.com'),
                                                 ('ZIme11', 'ZPrezime11', 'zaposlenik11@example.com'),
                                                 ('ZIme12', 'ZPrezime12', 'zaposlenik12@example.com'),
                                                 ('ZIme13', 'ZPrezime13', 'zaposlenik13@example.com'),
                                                 ('ZIme14', 'ZPrezime14', 'zaposlenik14@example.com'),
                                                 ('ZIme15', 'ZPrezime15', 'zaposlenik15@example.com'),
                                                 ('ZIme16', 'ZPrezime16', 'zaposlenik16@example.com'),
                                                 ('ZIme17', 'ZPrezime17', 'zaposlenik17@example.com'),
                                                 ('ZIme18', 'ZPrezime18', 'zaposlenik18@example.com'),
                                                 ('ZIme19', 'ZPrezime19', 'zaposlenik19@example.com'),
                                                 ('ZIme20', 'ZPrezime20', 'zaposlenik20@example.com');

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
                                           ('Ime1', 'Prezime1', 'gost1@example.com'),
                                           ('Ime2', 'Prezime2', 'gost2@example.com'),
                                           ('Ime3', 'Prezime3', 'gost3@example.com'),
                                           ('Ime4', 'Prezime4', 'gost4@example.com');

-- Insert data into Rezervacija table
INSERT INTO Rezervacija (datumDolaska, datumOdlaska, idGost) VALUES
                                                                 ('2024-04-21', '2024-05-01', 1),
                                                                 ('2024-05-07', '2024-05-12', 1),
                                                                 ('2024-05-14', '2024-05-20', 1),
                                                                 ('2024-04-15', '2024-04-22', 2),
                                                                 ('2024-05-08', '2024-05-14', 2),
                                                                 ('2024-05-10', '2024-05-15', 3),
                                                                 ('2024-05-09', '2024-05-13', 3),
                                                                 ('2024-05-12', '2024-05-17', 3),
                                                                 ('2024-05-14', '2024-05-18', 4),
                                                                 ('2024-05-04', '2024-05-08', 4);

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
-- Insert data into RezervacijaSoba table
INSERT INTO RezervacijaSoba (sifraRezervacije, idSoba, checkIn, checkOut, brojGostiju, specijalniZahtjevi) VALUES
                                                                                                               (1, 11, '2024-05-11 10:53:40', '2024-05-14 10:53:40', 1, 'None'), -- Reservation 1
                                                                                                               (2, 2, '2024-05-05 10:53:40', '2024-05-20 10:53:40', 2, 'Vegetarian meal'), -- Reservation 2
                                                                                                               (3, 5, '2024-04-28 10:53:40', '2024-05-05 10:53:40', 2, 'Vegetarian meal'), -- Reservation 3
                                                                                                               (4, 8, '2024-05-14 10:53:40', '2024-05-18 10:53:40', 2, 'Late check-out'), -- Reservation 4
                                                                                                               (5, 17, '2024-05-05 10:53:40', '2024-05-07 10:53:40', 2, 'Extra bed'), -- Reservation 5
                                                                                                               (5, 18, '2024-05-05 10:53:40', '2024-05-07 10:53:40', 2, 'None'), -- Reservation 5
                                                                                                               (6, 15, '2024-05-09 10:53:40', '2024-05-11 10:53:40', 4, 'Late check-out'), -- Reservation 6
                                                                                                               (6, 16, '2024-05-09 10:53:40', '2024-05-11 10:53:40', 4, 'None'), -- Reservation 6
                                                                                                               (7, 5, '2024-04-22 10:53:40', '2024-05-07 10:53:40', 3, 'Extra bed'), -- Reservation 7
                                                                                                               (7, 20, '2024-04-23 10:53:40', '2024-05-05 10:53:40', 2, 'Extra bed'), -- Reservation 7
                                                                                                               (8, 6, '2024-05-01 10:53:40', '2024-05-08 10:53:40', 1, 'None'), -- Reservation 8
                                                                                                               (8, 10, '2024-05-01 10:53:40', '2024-05-08 10:53:40', 1, 'None'), -- Reservation 8
                                                                                                               (9, 3, '2024-05-06 10:53:40', '2024-05-10 10:53:40', 1, 'None'), -- Reservation 9
                                                                                                               (9, 4, '2024-05-06 10:53:40', '2024-05-10 10:53:40', 1, 'None'), -- Reservation 9
                                                                                                               (9, 5, '2024-05-06 10:53:40', '2024-05-10 10:53:40', 1, 'None'), -- Reservation 9
                                                                                                               (10, 14, '2024-05-04 10:53:40', '2024-05-12 10:53:40', 2, 'Extra bed'), -- Reservation 10
                                                                                                               (10, 16, '2024-05-04 10:53:40', '2024-05-12 10:53:40', 2, 'Late check-out'), -- Reservation 10
                                                                                                               (10, 18, '2024-05-04 10:53:40', '2024-05-12 10:53:40', 2, 'None'); -- Reservation 10
