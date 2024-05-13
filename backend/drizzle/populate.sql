INSERT INTO "addresses" ("id", "state", "city", "street", "street_number", "zip_code") VALUES
(2,	'Italia',	'Padova',	' Via Andrea Colotti',	'23',	'35133'),
(4,	'Italia',	'Padova',	'Piazza Duomo',	'1',	'35122'),
(6,	'Italia',	'Padova',	'Via Bartolomeo Cristofori',	'12a',	'35137');

INSERT INTO "days_of_week" ("id", "name", "abbreviation", "order") VALUES
(1,	'Lunedì',	'LUN',	1),
(2,	'Martedì',	'MAR',	2),
(3,	'Mercoledì',	'MER',	3),
(4,	'Giovedì',	'GIO',	4),
(5,	'Venerdì',	'VEN',	5),
(6,	'Sabato',	'SAB',	6),
(7,	'Domenica',	'DOM',	7);

INSERT INTO "dishes" ("id", "id_restaurant", "name", "description", "price", "image") VALUES
(2,	2,	'Margherita',	'Classica pizza margherita',	6,	'./resources/restaurant/2/d3cb69df-2735-4c06-beca-a5a7f309aea6.png'),
(3,	2,	'4 Stagioni',	'Pizza alle 4 stagioni, le olive sono aggiunte a fine cottura',	9,	'./resources/restaurant/2/70cd5ee4-3362-443e-a1fc-8d3ba646f90c.png'),
(4,	2,	'Capricciosa',	'Una pizza',	9,	'./resources/restaurant/2/b4c85bbc-b9b5-4b4f-a4e6-84218c02044f.jpeg'),
(5,	2,	'Diavola',	'Una pizza',	7.5,	'./resources/restaurant/2/434f46c6-4921-401d-b735-7d7f34fbf84f.jpeg'),
(6,	2,	'Funghi',	'Pizza ai funghi',	7,	'./resources/restaurant/2/37ecd832-fdc4-49da-af78-1bb6ae798ab1.jpeg'),
(7,	2,	'Marinara',	'Pizza alla marinara',	5.5,	'./resources/restaurant/2/bde7a9eb-aa36-4367-a5be-eabce72bca4b.webp'),
(8,	2,	'Melanzane',	'Pizza alle melanzane',	7,	'./resources/restaurant/2/6d7f0e1e-c5b7-4f54-9161-32cb0164270d.png');

INSERT INTO "dishes_ingredients" ("id_dish", "id_ingredient", "quantity") VALUES
(2,	1,	2),
(2,	2,	2),
(2,	18,	1),
(3,	1,	2),
(3,	2,	2),
(3,	3,	1),
(3,	5,	1),
(3,	4,	50),
(3,	6,	7),
(4,	1,	2),
(4,	2,	2),
(4,	4,	50),
(4,	5,	1),
(4,	3,	1),
(4,	18,	1),
(3,	18,	1),
(5,	18,	1),
(5,	1,	2),
(5,	2,	1),
(5,	7,	100),
(6,	18,	1),
(6,	1,	2),
(6,	2,	2),
(6,	5,	3),
(7,	1,	2),
(7,	18,	NULL),
(7,	8,	10),
(7,	9,	10),
(8,	18,	1),
(8,	1,	2),
(8,	2,	2),
(8,	10,	1);

INSERT INTO "ingredients" ("id", "id_restaurant", "name", "unit_of_measurement") VALUES
(1,	2,	'Pomodoro',	'pz'),
(2,	2,	'Mozzarella',	'pz'),
(3,	2,	'Carciofi',	'pz'),
(4,	2,	'Prosciutto Cotto',	'g'),
(5,	2,	'Funghi',	'pz'),
(6,	2,	'Olive',	'pz'),
(7,	2,	'Salamino Piccante',	'g'),
(8,	2,	'Aglio',	'g'),
(9,	2,	'Origano',	'g'),
(10,	2,	'Melanzane',	'pz'),
(11,	2,	'Capperi di Pantelleria',	'g'),
(12,	2,	'Acciughe di Cetara',	'g'),
(13,	2,	'Olive taggiasche',	'pz'),
(14,	2,	'Prosciutto Crudo di Norcia',	'g'),
(15,	2,	'Patatine',	'g'),
(16,	2,	'Porcini',	'g'),
(17,	2,	'Radicchio',	'g'),
(18,	2,	'Pasta della pizza',	'pz');

INSERT INTO "notifications" ("id", "title", "message", "id_receiver", "role", "visualized") VALUES
(1,	'Nuova prenotazione',	'Hai ricevuto una nuova prenotazione con numero: 1',	2,	'restaurant',	'f'),
(2,	'Nuova ordinazione',	'La tua prenotazione 1 ha un nuovo ordine',	2,	'restaurant',	'f'),
(3,	'Nuova prenotazione',	'Hai ricevuto una nuova prenotazione con numero: 2',	2,	'restaurant',	'f');

INSERT INTO "opening_hours" ("id", "id_restaurant", "id_day", "opening_time", "closing_time") VALUES
(15,	4,	1,	'12:00:00',	'15:30:00'),
(16,	4,	1,	'18:30:00',	'01:00:00'),
(17,	4,	3,	'12:00:00',	'15:30:00'),
(18,	4,	3,	'18:30:00',	'01:00:00'),
(19,	4,	4,	'12:00:00',	'15:30:00'),
(20,	4,	4,	'18:30:00',	'01:00:00'),
(21,	4,	5,	'12:00:00',	'15:30:00'),
(22,	4,	5,	'18:30:00',	'01:00:00'),
(23,	4,	6,	'12:30:00',	'15:30:00'),
(24,	4,	6,	'18:30:00',	'01:00:00'),
(25,	4,	7,	'12:30:00',	'15:30:00'),
(27,	4,	7,	'18:30:00',	'00:00:00'),
(28,	3,	1,	'10:00:00',	'23:00:00'),
(29,	3,	2,	'11:00:00',	'23:00:00'),
(30,	3,	3,	'11:00:00',	'23:00:00'),
(31,	3,	4,	'11:00:00',	'23:00:00'),
(32,	3,	5,	'11:00:00',	'02:00:00'),
(33,	3,	6,	'10:00:00',	'02:00:00'),
(34,	3,	7,	'10:00:00',	'02:00:00'),
(1,	2,	1,	'19:00:00',	'23:00:00'),
(2,	2,	2,	'19:00:00',	'23:00:00'),
(3,	2,	3,	'19:00:00',	'23:00:00'),
(4,	2,	4,	'19:00:00',	'23:00:00'),
(5,	2,	5,	'19:00:00',	'23:00:00'),
(6,	2,	6,	'19:00:00',	'23:00:00'),
(7,	2,	7,	'19:00:00',	'23:00:00');

INSERT INTO "ordered_dishes" ("id", "id_user", "id_reservation", "id_dish", "paid") VALUES
(4,	1,	1,	2,	'f'),
(5,	1,	1,	4,	'f');


INSERT INTO "reservations" ("id", "id_restaurant", "date", "partecipants", "reservation_state", "bill_splitting_method", "paid_orders") VALUES
(1,	2,	'2024-05-14 19:30:00+00',	10,	'In attesa',	'Equidiviso',	0),
(2,	2,	'2024-05-14 20:00:00+00',	4,	'In attesa',	'Equidiviso',	0);

INSERT INTO "restaurants" ("id", "email", "password", "name", "owner_name", "owner_surname", "id_address", "seats", "website", "price_tier", "description", "phone", "childrenn_seats", "accessibility", "logo", "banner_image") VALUES
(2,	'ristorante@gmail.com',	'$argon2id$v=19$m=65536,t=3,p=4$tNuyjGjZyOzqZLBacYxSyg$kF+CBaww+/Cwsgr9SmXfFzS9uCVYMD+0BwFqJbSbbbk',	'Al Solito Posto',	'Carlo',	'Rosso',	2,	100,	'https://pizzeriaalsolitoposto.it/',	2,	'Il ristorante pizzeria a Padova Al Solito Posto è un luogo accogliente e familiare perfetto per gli amanti della pizza gustosa e leggera.',	'049 8643877',	NULL,	NULL,	'./resources/restaurant/2/fc6d5116-b298-4e7c-9357-1811fac0a575.svg',	'./resources/restaurant/2/9fd1f154-608e-4f15-a98b-53bc50f9da13.jpeg'),
(4,	'ristorante3@gmail.com',	'$argon2id$v=19$m=65536,t=3,p=4$+YD4POYUFL3G5G0cdxYl7w$buPbKclL3Cj1gT6ygjRXdETqNmSwOPRvfR2tLD9Et7o',	'A Banda Del Buso',	'Matteo',	'Bando',	6,	70,	'https://www.abandadelbuso.it/',	1,	'Si dice corresse l’anno 1947 quando Ettore Buso aprì la sua trattoria con specialità padovane, di cui conserviamo l’insegna originale.',	'049 2023453',	NULL,	NULL,	'./resources/restaurant/4/bb708d28-212c-4168-a3b0-349b145643ff.svg',	'./resources/restaurant/4/0734a27d-a3ad-4d03-a366-4c329c23d806.jpg'),
(3,	'ristorante2@gmail.com',	'$argon2id$v=19$m=65536,t=3,p=4$tNuyjGjZyOzqZLBacYxSyg$kF+CBaww+/Cwsgr9SmXfFzS9uCVYMD+0BwFqJbSbbbk',	'Il Gancino',	'Alessandro',	'Tigani Sava',	4,	90,	'https://www.ilgancino.com/',	3,	'Per noi l''essenza della materia prima è la base delle nostre ricette. I nostri fornitori sono per il 99% Veneti, per assicurare un prodotto a chilometri zero con una qualità sorprendente.',	'049 9819978',	NULL,	NULL,	'./resources/restaurant/3/2ac6e260-e770-4bb7-8da5-e13a76ed85b7.webp',	'./resources/restaurant/3/c8c2e15b-7336-4ec8-a6c3-736d3cea227b.jpeg');

INSERT INTO "users" ("id", "name", "surname", "email", "password") VALUES
(1,	'Davide',	'Maffei',	'cliente@gmail.com',	'$argon2id$v=19$m=65536,t=3,p=4$U61KzqgU7g8mR5O4Z8SWfg$YORt1LqpOI5qZEAjEDD74wE8LLesrK4UF569dCKhblk');

INSERT INTO "users_reservations" ("id_user", "id_reservation", "accepted") VALUES
(1,	1,	't'),
(1,	2,	't');