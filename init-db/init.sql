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


-- Insert data into Gost table
INSERT INTO Gost (ime, prezime, email) VALUES
                                           ('Ime1', 'Prezime1', 'gost1@example.com'),
                                           ('Ime2', 'Prezime2', 'gost2@example.com'),
                                           ('Ime3', 'Prezime3', 'gost3@example.com'),
                                           ('Ime4', 'Prezime4', 'gost4@example.com'),
                                           ('Ime5', 'Prezime5', 'gost5@example.com'),
                                           ('Ime6', 'Prezime6', 'gost6@example.com'),
                                           ('Ime7', 'Prezime7', 'gost7@example.com'),
                                           ('Ime8', 'Prezime8', 'gost8@example.com'),
                                           ('Ime9', 'Prezime9', 'gost9@example.com'),
                                           ('Ime10', 'Prezime10', 'gost10@example.com');


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

-- Insert data into Rezervacija table
INSERT INTO Rezervacija (datumDolaska, datumOdlaska, idGost) VALUES
                                                                 ('2024-04-21', '2024-05-01', 1),
                                                                 ('2024-04-15', '2024-04-22', 2),
                                                                 ('2024-05-10', '2024-05-15', 3),
                                                                 ('2024-05-14', '2024-05-18', 4),
                                                                 ('2024-05-01', '2024-05-10', 5),
                                                                 ('2024-04-28', '2024-05-05', 6),
                                                                 ('2024-04-22', '2024-05-07', 7),
                                                                 ('2024-04-25', '2024-05-01', 8),
                                                                 ('2024-05-03', '2024-05-12', 9),
                                                                 ('2024-05-06', '2024-05-15', 10),
                                                                 ('2024-05-07', '2024-05-12', 1),
                                                                 ('2024-05-08', '2024-05-11', 2),
                                                                 ('2024-05-09', '2024-05-13', 3),
                                                                 ('2024-05-04', '2024-05-08', 4),
                                                                 ('2024-05-02', '2024-05-06', 5),
                                                                 ('2024-05-05', '2024-05-07', 6),
                                                                 ('2024-05-01', '2024-05-04', 7),
                                                                 ('2024-05-11', '2024-05-14', 8),
                                                                 ('2024-05-13', '2024-05-17', 9),
                                                                 ('2024-04-28', '2024-05-05', 10),
                                                                 ('2024-05-14', '2024-05-20', 1),
                                                                 ('2024-05-10', '2024-05-18', 2),
                                                                 ('2024-05-12', '2024-05-17', 3),
                                                                 ('2024-05-08', '2024-05-14', 4),
                                                                 ('2024-05-06', '2024-05-12', 5);

-- Insert data into Placanje table
INSERT INTO Placanje (iznos, nacinPlacanja, sifraRezervacije, idGost) VALUES
                                                                          (534.75, 'Kartica', 1, 1),
                                                                          (289.50, 'Gotovina', 2, 2),
                                                                          (123.60, 'Online', 3, 3),
                                                                          (756.80, 'Kartica', 4, 4),
                                                                          (499.99, 'Gotovina', 5, 5),
                                                                          (200.50, 'Online', 6, 6),
                                                                          (300.00, 'Kartica', 7, 7),
                                                                          (400.75, 'Gotovina', 8, 8),
                                                                          (600.25, 'Online', 9, 9),
                                                                          (255.50, 'Kartica', 10, 10),
                                                                          (145.80, 'Gotovina', 11, 1),
                                                                          (678.90, 'Online', 12, 2),
                                                                          (230.40, 'Kartica', 13, 3),
                                                                          (150.70, 'Gotovina', 14, 4),
                                                                          (460.85, 'Online', 15, 5),
                                                                          (312.55, 'Kartica', 16, 6),
                                                                          (274.90, 'Gotovina', 17, 7),
                                                                          (367.45, 'Online', 18, 8),
                                                                          (498.60, 'Kartica', 19, 9),
                                                                          (456.90, 'Kartica', 20, 10),
                                                                          (145.80, 'Gotovina', 21, 1),
                                                                          (678.90, 'Online', 22, 2),
                                                                          (230.40, 'Kartica', 23, 3),
                                                                          (150.70, 'Gotovina', 24, 4),
                                                                          (460.85, 'Online', 25, 5);

-- Insert data into RezervacijaSoba table
INSERT INTO RezervacijaSoba (sifraRezervacije, idSoba, checkIn, checkOut, brojGostiju, specijalniZahtjevi) VALUES
                                                                                                               (4, 8, '2024-05-14 10:53:40', '2024-05-18 10:53:40', 2, 'Late check-out'),
                                                                                                               (7, 5, '2024-04-22 10:53:40', '2024-05-07 10:53:40', 3, 'Extra bed'),
                                                                                                               (7, 20, '2024-04-23 10:53:40', '2024-05-05 10:53:40', 2, 'Extra bed'),
                                                                                                               (13, 7, '2024-05-13 10:53:40', '2024-05-10 10:53:40', 4, 'Late check-out'),
                                                                                                               (2, 2, '2024-05-05 10:53:40', '2024-05-20 10:53:40', 2, 'Vegetarian meal'),
                                                                                                               (14, 10, '2024-05-03 10:53:40', '2024-05-10 10:53:40', 3, 'None'),
                                                                                                               (8, 6, '2024-05-01 10:53:40', '2024-05-08 10:53:40', 1, 'None'),
                                                                                                               (10, 14, '2024-05-04 10:53:40', '2024-05-12 10:53:40', 2, 'Extra bed'),
                                                                                                               (19, 12, '2024-05-07 10:53:40', '2024-05-10 10:53:40', 2, 'Late check-out'),
                                                                                                               (1, 11, '2024-05-11 10:53:40', '2024-05-14 10:53:40', 1, 'None'),
                                                                                                               (5, 17, '2024-05-05 10:53:40', '2024-05-07 10:53:40', 2, 'Extra bed'),
                                                                                                               (6, 15, '2024-05-09 10:53:40', '2024-05-11 10:53:40', 4, 'Late check-out'),
                                                                                                               (12, 19, '2024-05-10 10:53:40', '2024-05-15 10:53:40', 3, 'Vegetarian meal'),
                                                                                                               (15, 1, '2024-05-14 10:53:40', '2024-05-18 10:53:40', 2, 'Late check-out'),
                                                                                                               (9, 3, '2024-05-06 10:53:40', '2024-05-10 10:53:40', 1, 'None'),
                                                                                                               (11, 9, '2024-05-07 10:53:40', '2024-05-12 10:53:40', 2, 'Extra bed'),
                                                                                                               (16, 4, '2024-05-02 10:53:40', '2024-05-06 10:53:40', 1, 'None'),
                                                                                                               (3, 5, '2024-04-28 10:53:40', '2024-05-05 10:53:40', 2, 'Vegetarian meal'),
                                                                                                               (20, 18, '2024-05-03 10:53:40', '2024-05-06 10:53:40', 4, 'None'),
                                                                                                               (18, 16, '2024-05-13 10:53:40', '2024-05-17 10:53:40', 1, 'None'),
                                                                                                               (17, 13, '2024-05-01 10:53:40', '2024-05-04 10:53:40', 2, 'Extra bed'),
                                                                                                               (25, 2, '2024-04-15 10:53:40', '2024-04-22 10:53:40', 3, 'Vegetarian meal'),
                                                                                                               (24, 14, '2024-05-06 10:53:40', '2024-05-12 10:53:40', 1, 'None');



