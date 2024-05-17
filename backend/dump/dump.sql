--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    id integer NOT NULL,
    state character varying(100) NOT NULL,
    city character varying(100) NOT NULL,
    street character varying(255) NOT NULL,
    street_number character varying(20) NOT NULL,
    zip_code character varying(10) NOT NULL
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.addresses_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.addresses_id_seq OWNER TO postgres;

--
-- Name: addresses_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.addresses_id_seq OWNED BY public.addresses.id;


--
-- Name: allergies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allergies (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    icon character varying(255) NOT NULL
);


ALTER TABLE public.allergies OWNER TO postgres;

--
-- Name: allergies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.allergies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.allergies_id_seq OWNER TO postgres;

--
-- Name: allergies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.allergies_id_seq OWNED BY public.allergies.id;


--
-- Name: allergies_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.allergies_ingredients (
    id_allergy integer NOT NULL,
    id_ingredient integer NOT NULL
);


ALTER TABLE public.allergies_ingredients OWNER TO postgres;

--
-- Name: bills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_reservation integer NOT NULL,
    date timestamp with time zone NOT NULL,
    total_bill real NOT NULL,
    bill_state character varying(50) NOT NULL
);


ALTER TABLE public.bills OWNER TO postgres;

--
-- Name: bills_details; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bills_details (
    id integer NOT NULL,
    id_ordered_dishes integer NOT NULL,
    id_bill integer NOT NULL
);


ALTER TABLE public.bills_details OWNER TO postgres;

--
-- Name: bills_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_details_id_seq OWNER TO postgres;

--
-- Name: bills_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_details_id_seq OWNED BY public.bills_details.id;


--
-- Name: bills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bills_id_seq OWNER TO postgres;

--
-- Name: bills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bills_id_seq OWNED BY public.bills.id;


--
-- Name: days_of_week; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.days_of_week (
    id integer NOT NULL,
    name character varying(20) NOT NULL,
    abbreviation character varying(5) NOT NULL,
    "order" integer NOT NULL
);


ALTER TABLE public.days_of_week OWNER TO postgres;

--
-- Name: days_of_week_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.days_of_week_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.days_of_week_id_seq OWNER TO postgres;

--
-- Name: days_of_week_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.days_of_week_id_seq OWNED BY public.days_of_week.id;


--
-- Name: dishes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dishes (
    id integer NOT NULL,
    id_restaurant integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255) NOT NULL,
    price real NOT NULL,
    image character varying(255) NOT NULL
);


ALTER TABLE public.dishes OWNER TO postgres;

--
-- Name: dishes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dishes_id_seq OWNER TO postgres;

--
-- Name: dishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dishes_id_seq OWNED BY public.dishes.id;


--
-- Name: dishes_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dishes_ingredients (
    id_dish integer NOT NULL,
    id_ingredient integer NOT NULL,
    quantity real
);


ALTER TABLE public.dishes_ingredients OWNER TO postgres;

--
-- Name: dishes_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dishes_tags (
    id_tag integer NOT NULL,
    id_dish integer NOT NULL
);


ALTER TABLE public.dishes_tags OWNER TO postgres;

--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    id integer NOT NULL,
    id_restaurant integer NOT NULL,
    name character varying(50) NOT NULL,
    unit_of_measurement character varying(5)
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ingredients_id_seq OWNER TO postgres;

--
-- Name: ingredients_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_id_seq OWNED BY public.ingredients.id;


--
-- Name: notifications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.notifications (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    message character varying(255) NOT NULL,
    id_receiver integer NOT NULL,
    role character varying(255) NOT NULL,
    visualized boolean DEFAULT false NOT NULL
);


ALTER TABLE public.notifications OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.notifications_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.notifications_id_seq OWNER TO postgres;

--
-- Name: notifications_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.notifications_id_seq OWNED BY public.notifications.id;


--
-- Name: opening_hours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opening_hours (
    id integer NOT NULL,
    id_restaurant integer NOT NULL,
    id_day integer NOT NULL,
    opening_time time without time zone NOT NULL,
    closing_time time without time zone NOT NULL
);


ALTER TABLE public.opening_hours OWNER TO postgres;

--
-- Name: opening_hours_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opening_hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opening_hours_id_seq OWNER TO postgres;

--
-- Name: opening_hours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opening_hours_id_seq OWNED BY public.opening_hours.id;


--
-- Name: ordered_dishes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ordered_dishes (
    id integer NOT NULL,
    id_user integer NOT NULL,
    id_reservation integer NOT NULL,
    id_dish integer NOT NULL,
    paid boolean
);


ALTER TABLE public.ordered_dishes OWNER TO postgres;

--
-- Name: ordered_dishes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ordered_dishes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ordered_dishes_id_seq OWNER TO postgres;

--
-- Name: ordered_dishes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ordered_dishes_id_seq OWNED BY public.ordered_dishes.id;


--
-- Name: removed_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.removed_ingredients (
    id_ordered_dish integer NOT NULL,
    id_ingredient integer NOT NULL
);


ALTER TABLE public.removed_ingredients OWNER TO postgres;

--
-- Name: reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservations (
    id integer NOT NULL,
    id_restaurant integer NOT NULL,
    date timestamp with time zone NOT NULL,
    partecipants integer NOT NULL,
    reservation_state character varying(50) NOT NULL,
    bill_splitting_method character varying(50) NOT NULL,
    paid_orders integer NOT NULL
);


ALTER TABLE public.reservations OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservations_id_seq OWNER TO postgres;

--
-- Name: reservations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservations_id_seq OWNED BY public.reservations.id;


--
-- Name: restaurants; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants (
    id integer NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL,
    name character varying(50) NOT NULL,
    owner_name character varying(50) NOT NULL,
    owner_surname character varying(50) NOT NULL,
    id_address integer NOT NULL,
    seats integer NOT NULL,
    website character varying(255),
    price_tier integer NOT NULL,
    description character varying(255) NOT NULL,
    phone character varying(13) NOT NULL,
    childrenn_seats integer,
    accessibility boolean,
    logo character varying(255) DEFAULT ''::character varying,
    banner_image character varying(255) DEFAULT ''::character varying
);


ALTER TABLE public.restaurants OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.restaurants_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.restaurants_id_seq OWNER TO postgres;

--
-- Name: restaurants_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.restaurants_id_seq OWNED BY public.restaurants.id;


--
-- Name: restaurants_tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.restaurants_tags (
    id_tag integer NOT NULL,
    id_restaurant integer NOT NULL
);


ALTER TABLE public.restaurants_tags OWNER TO postgres;

--
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id_restaurant integer NOT NULL,
    id_user integer NOT NULL,
    date timestamp with time zone NOT NULL,
    score integer NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description character varying(255)
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- Name: transactions_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.transactions_logs (
    id integer NOT NULL,
    id_bill integer NOT NULL,
    date timestamp with time zone NOT NULL,
    transaction_state character varying(50) NOT NULL,
    message character varying(255) NOT NULL
);


ALTER TABLE public.transactions_logs OWNER TO postgres;

--
-- Name: transactions_logs_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.transactions_logs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.transactions_logs_id_seq OWNER TO postgres;

--
-- Name: transactions_logs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.transactions_logs_id_seq OWNED BY public.transactions_logs.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    surname character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_allergies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_allergies (
    id_user integer NOT NULL,
    id_allergy integer NOT NULL
);


ALTER TABLE public.users_allergies OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: users_reservations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_reservations (
    id_user integer NOT NULL,
    id_reservation integer NOT NULL,
    accepted boolean DEFAULT false
);


ALTER TABLE public.users_reservations OWNER TO postgres;

--
-- Name: addresses id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses ALTER COLUMN id SET DEFAULT nextval('public.addresses_id_seq'::regclass);


--
-- Name: allergies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies ALTER COLUMN id SET DEFAULT nextval('public.allergies_id_seq'::regclass);


--
-- Name: bills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills ALTER COLUMN id SET DEFAULT nextval('public.bills_id_seq'::regclass);


--
-- Name: bills_details id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_details ALTER COLUMN id SET DEFAULT nextval('public.bills_details_id_seq'::regclass);


--
-- Name: days_of_week id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.days_of_week ALTER COLUMN id SET DEFAULT nextval('public.days_of_week_id_seq'::regclass);


--
-- Name: dishes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes ALTER COLUMN id SET DEFAULT nextval('public.dishes_id_seq'::regclass);


--
-- Name: ingredients id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN id SET DEFAULT nextval('public.ingredients_id_seq'::regclass);


--
-- Name: notifications id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications ALTER COLUMN id SET DEFAULT nextval('public.notifications_id_seq'::regclass);


--
-- Name: opening_hours id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opening_hours ALTER COLUMN id SET DEFAULT nextval('public.opening_hours_id_seq'::regclass);


--
-- Name: ordered_dishes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_dishes ALTER COLUMN id SET DEFAULT nextval('public.ordered_dishes_id_seq'::regclass);


--
-- Name: reservations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations ALTER COLUMN id SET DEFAULT nextval('public.reservations_id_seq'::regclass);


--
-- Name: restaurants id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants ALTER COLUMN id SET DEFAULT nextval('public.restaurants_id_seq'::regclass);


--
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- Name: transactions_logs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions_logs ALTER COLUMN id SET DEFAULT nextval('public.transactions_logs_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, state, city, street, street_number, zip_code) FROM stdin;
1001	Italia	Padova	 Via Andrea Colotti	23	35133
1002	Italia	Padova	Via Bartolomeo Cristofori	12a	35137
1003	Italia	Padova	Piazza Duomo	1	35122
\.


--
-- Data for Name: allergies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.allergies (id, name, icon) FROM stdin;
\.


--
-- Data for Name: allergies_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.allergies_ingredients (id_allergy, id_ingredient) FROM stdin;
\.


--
-- Data for Name: bills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills (id, id_user, id_reservation, date, total_bill, bill_state) FROM stdin;
\.


--
-- Data for Name: bills_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills_details (id, id_ordered_dishes, id_bill) FROM stdin;
\.


--
-- Data for Name: days_of_week; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.days_of_week (id, name, abbreviation, "order") FROM stdin;
1	Lunedì	LUN	1
2	Martedì	MAR	2
3	Mercoledì	MER	3
4	Giovedì	GIO	4
5	Venerdì	VEN	5
6	Sabato	SAB	6
7	Domenica	DOM	7
\.


--
-- Data for Name: dishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishes (id, id_restaurant, name, description, price, image) FROM stdin;
1001	1001	Margherita	Classica pizza margherita	6	./resources/restaurant/2/d3cb69df-2735-4c06-beca-a5a7f309aea6.png
1002	1001	4 Stagioni	Pizza alle 4 stagioni, le olive sono aggiunte a fine cottura	9	./resources/restaurant/2/70cd5ee4-3362-443e-a1fc-8d3ba646f90c.png
1003	1001	Capricciosa	Una pizza	9	./resources/restaurant/2/b4c85bbc-b9b5-4b4f-a4e6-84218c02044f.jpeg
1004	1001	Melanzane	Pizza alle melanzane	7	./resources/restaurant/2/6d7f0e1e-c5b7-4f54-9161-32cb0164270d.png
1005	1001	Marinara	Pizza alla marinara	5.5	./resources/restaurant/2/bde7a9eb-aa36-4367-a5be-eabce72bca4b.webp
1006	1001	Funghi	Pizza ai funghi	7	./resources/restaurant/2/37ecd832-fdc4-49da-af78-1bb6ae798ab1.jpeg
1007	1001	Diavola	Una pizza	7.5	./resources/restaurant/2/434f46c6-4921-401d-b735-7d7f34fbf84f.jpeg
\.


--
-- Data for Name: dishes_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishes_ingredients (id_dish, id_ingredient, quantity) FROM stdin;
1001	1001	2
1002	1001	2
1003	1001	2
1004	1001	2
1005	1001	2
1006	1001	2
1007	1001	2
1001	1002	2
1002	1002	2
1003	1002	2
1004	1002	2
1006	1002	2
1007	1002	1
1002	1003	1
1003	1003	1
1002	1004	50
1003	1004	50
1002	1005	1
1003	1005	1
1006	1005	3
1002	1006	7
1007	1007	100
1005	1008	10
1005	1009	10
1004	1010	1
1001	1018	1
1002	1018	1
1003	1018	1
1004	1018	1
1005	1018	\N
1006	1018	1
1007	1018	1
\.


--
-- Data for Name: dishes_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishes_tags (id_tag, id_dish) FROM stdin;
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (id, id_restaurant, name, unit_of_measurement) FROM stdin;
1001	1001	Pomodoro	pz
1002	1001	Mozzarella	pz
1003	1001	Carciofi	pz
1004	1001	Prosciutto Cotto	g
1005	1001	Funghi	pz
1006	1001	Olive	pz
1007	1001	Salamino Piccante	g
1008	1001	Aglio	g
1009	1001	Origano	g
1010	1001	Melanzane	pz
1011	1001	Capperi di Pantelleria	g
1012	1001	Acciughe di Cetara	g
1013	1001	Olive taggiasche	pz
1014	1001	Prosciutto Crudo di Norcia	g
1015	1001	Patatine	g
1016	1001	Porcini	g
1017	1001	Radicchio	g
1018	1001	Pasta della pizza	pz
\.


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.notifications (id, title, message, id_receiver, role, visualized) FROM stdin;
1001	Nuova prenotazione	Hai ricevuto una nuova prenotazione con numero: 1	2	restaurant	f
1003	Nuova prenotazione	Hai ricevuto una nuova prenotazione con numero: 2	2	restaurant	f
1002	Nuova ordinazione	La tua prenotazione 1 ha un nuovo ordine	2	restaurant	f
\.


--
-- Data for Name: opening_hours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opening_hours (id, id_restaurant, id_day, opening_time, closing_time) FROM stdin;
1001	1001	1	19:00:00	23:00:00
1002	1001	2	19:00:00	23:00:00
1003	1001	3	19:00:00	23:00:00
1004	1001	4	19:00:00	23:00:00
1005	1001	5	19:00:00	23:00:00
1006	1001	6	19:00:00	23:00:00
1007	1001	7	19:00:00	23:00:00
1008	1002	1	10:00:00	23:00:00
1009	1002	2	11:00:00	23:00:00
1010	1002	3	11:00:00	23:00:00
1011	1002	4	11:00:00	23:00:00
1012	1002	5	11:00:00	02:00:00
1013	1002	6	10:00:00	02:00:00
1014	1002	7	10:00:00	02:00:00
1015	1003	1	12:00:00	15:30:00
1016	1003	1	18:30:00	01:00:00
1017	1003	3	12:00:00	15:30:00
1018	1003	3	18:30:00	01:00:00
1019	1003	4	12:00:00	15:30:00
1020	1003	4	18:30:00	01:00:00
1021	1003	5	12:00:00	15:30:00
1022	1003	5	18:30:00	01:00:00
1023	1003	6	12:30:00	15:30:00
1024	1003	6	18:30:00	01:00:00
1025	1003	7	12:30:00	15:30:00
1027	1003	7	18:30:00	00:00:00
\.


--
-- Data for Name: ordered_dishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ordered_dishes (id, id_user, id_reservation, id_dish, paid) FROM stdin;
1001	1000	1001	1001	f
1002	1000	1001	1003	f
\.


--
-- Data for Name: removed_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.removed_ingredients (id_ordered_dish, id_ingredient) FROM stdin;
\.


--
-- Data for Name: reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservations (id, id_restaurant, date, partecipants, reservation_state, bill_splitting_method, paid_orders) FROM stdin;
1001	1001	2024-05-14 19:30:00+00	10	In attesa	Equidiviso	0
1002	1001	2024-05-14 20:00:00+00	4	In attesa	Equidiviso	0
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (id, email, password, name, owner_name, owner_surname, id_address, seats, website, price_tier, description, phone, childrenn_seats, accessibility, logo, banner_image) FROM stdin;
1001	ristorante@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$tNuyjGjZyOzqZLBacYxSyg$kF+CBaww+/Cwsgr9SmXfFzS9uCVYMD+0BwFqJbSbbbk	Al Solito Posto	Carlo	Rosso	1001	100	https://pizzeriaalsolitoposto.it/	2	Il ristorante pizzeria a Padova Al Solito Posto è un luogo accogliente e familiare perfetto per gli amanti della pizza gustosa e leggera.	049 8643877	\N	\N	./resources/restaurant/2/fc6d5116-b298-4e7c-9357-1811fac0a575.svg	./resources/restaurant/2/9fd1f154-608e-4f15-a98b-53bc50f9da13.jpeg
1002	ristorante2@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$tNuyjGjZyOzqZLBacYxSyg$kF+CBaww+/Cwsgr9SmXfFzS9uCVYMD+0BwFqJbSbbbk	Il Gancino	Alessandro	Tigani Sava	1003	90	https://www.ilgancino.com/	3	Per noi l’essenza della materia prima è la base delle nostre ricette. I nostri fornitori sono per il 99% Veneti, per assicurare un prodotto a chilometri zero con una qualità sorprendente.	049 9819978	\N	\N	./resources/restaurant/3/2ac6e260-e770-4bb7-8da5-e13a76ed85b7.webp	./resources/restaurant/3/c8c2e15b-7336-4ec8-a6c3-736d3cea227b.jpeg
1003	ristorante3@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$+YD4POYUFL3G5G0cdxYl7w$buPbKclL3Cj1gT6ygjRXdETqNmSwOPRvfR2tLD9Et7o	A Banda Del Buso	Matteo	Bando	1002	70	https://www.abandadelbuso.it/	1	Si dice corresse l’anno 1947 quando Ettore Buso aprì la sua trattoria con specialità padovane, di cui conserviamo l’insegna originale.	049 2023453	\N	\N	./resources/restaurant/4/bb708d28-212c-4168-a3b0-349b145643ff.svg	./resources/restaurant/4/0734a27d-a3ad-4d03-a366-4c329c23d806.jpg
\.


--
-- Data for Name: restaurants_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants_tags (id_tag, id_restaurant) FROM stdin;
\.


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reviews (id_restaurant, id_user, date, score, description) FROM stdin;
\.


--
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, name, description) FROM stdin;
\.


--
-- Data for Name: transactions_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions_logs (id, id_bill, date, transaction_state, message) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, email, password) FROM stdin;
1000	Davide	Maffei	cliente@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$U61KzqgU7g8mR5O4Z8SWfg$YORt1LqpOI5qZEAjEDD74wE8LLesrK4UF569dCKhblk
\.


--
-- Data for Name: users_allergies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_allergies (id_user, id_allergy) FROM stdin;
\.


--
-- Data for Name: users_reservations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_reservations (id_user, id_reservation, accepted) FROM stdin;
1000	1001	t
1000	1002	t
\.


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 1, false);


--
-- Name: allergies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.allergies_id_seq', 1, false);


--
-- Name: bills_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_details_id_seq', 1, false);


--
-- Name: bills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_id_seq', 1, false);


--
-- Name: days_of_week_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.days_of_week_id_seq', 1, false);


--
-- Name: dishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dishes_id_seq', 1, false);


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 1, false);


--
-- Name: notifications_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notifications_id_seq', 1, false);


--
-- Name: opening_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opening_hours_id_seq', 1, false);


--
-- Name: ordered_dishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordered_dishes_id_seq', 1, false);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 1, false);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 1, false);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 1, false);


--
-- Name: transactions_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_logs_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 1, false);


--
-- Name: addresses address; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT address UNIQUE (state, city, street, street_number, zip_code);


--
-- Name: addresses addresses_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT addresses_pkey PRIMARY KEY (id);


--
-- Name: allergies_ingredients allergies_ingredients_id_allergy_id_ingredient_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies_ingredients
    ADD CONSTRAINT allergies_ingredients_id_allergy_id_ingredient_pk PRIMARY KEY (id_allergy, id_ingredient);


--
-- Name: allergies allergies_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT allergies_name_unique UNIQUE (name);


--
-- Name: allergies allergies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies
    ADD CONSTRAINT allergies_pkey PRIMARY KEY (id);


--
-- Name: bills_details bills_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_details
    ADD CONSTRAINT bills_details_pkey PRIMARY KEY (id);


--
-- Name: bills bills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_pkey PRIMARY KEY (id);


--
-- Name: days_of_week days_of_week_abbreviation_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.days_of_week
    ADD CONSTRAINT days_of_week_abbreviation_unique UNIQUE (abbreviation);


--
-- Name: days_of_week days_of_week_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.days_of_week
    ADD CONSTRAINT days_of_week_name_unique UNIQUE (name);


--
-- Name: days_of_week days_of_week_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.days_of_week
    ADD CONSTRAINT days_of_week_pkey PRIMARY KEY (id);


--
-- Name: dishes_ingredients dishes_ingredients_id_dish_id_ingredient_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_ingredients
    ADD CONSTRAINT dishes_ingredients_id_dish_id_ingredient_pk PRIMARY KEY (id_dish, id_ingredient);


--
-- Name: dishes dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_pkey PRIMARY KEY (id);


--
-- Name: dishes_tags dishes_tags_id_tag_id_dish_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_tags
    ADD CONSTRAINT dishes_tags_id_tag_id_dish_pk PRIMARY KEY (id_tag, id_dish);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (id);


--
-- Name: notifications notifications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.notifications
    ADD CONSTRAINT notifications_pkey PRIMARY KEY (id);


--
-- Name: opening_hours opening_hours_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opening_hours
    ADD CONSTRAINT opening_hours_pkey PRIMARY KEY (id);


--
-- Name: ordered_dishes ordered_dishes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_dishes
    ADD CONSTRAINT ordered_dishes_pkey PRIMARY KEY (id);


--
-- Name: removed_ingredients removed_ingredients_id_ordered_dish_id_ingredient_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.removed_ingredients
    ADD CONSTRAINT removed_ingredients_id_ordered_dish_id_ingredient_pk PRIMARY KEY (id_ordered_dish, id_ingredient);


--
-- Name: reservations reservations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_pkey PRIMARY KEY (id);


--
-- Name: restaurants restaurants_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_email_unique UNIQUE (email);


--
-- Name: restaurants restaurants_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_pkey PRIMARY KEY (id);


--
-- Name: restaurants_tags restaurants_tags_id_tag_id_restaurant_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants_tags
    ADD CONSTRAINT restaurants_tags_id_tag_id_restaurant_pk PRIMARY KEY (id_tag, id_restaurant);


--
-- Name: reviews reviews_id_restaurant_id_user_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_id_restaurant_id_user_pk PRIMARY KEY (id_restaurant, id_user);


--
-- Name: tags tags_name_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_name_unique UNIQUE (name);


--
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- Name: transactions_logs transactions_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions_logs
    ADD CONSTRAINT transactions_logs_pkey PRIMARY KEY (id);


--
-- Name: users_allergies users_allergies_id_user_id_allergy_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_allergies
    ADD CONSTRAINT users_allergies_id_user_id_allergy_pk PRIMARY KEY (id_user, id_allergy);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users_reservations users_reservations_id_user_id_reservation_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reservations
    ADD CONSTRAINT users_reservations_id_user_id_reservation_pk PRIMARY KEY (id_user, id_reservation);


--
-- Name: allergies_ingredients allergies_ingredients_id_allergy_allergies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies_ingredients
    ADD CONSTRAINT allergies_ingredients_id_allergy_allergies_id_fk FOREIGN KEY (id_allergy) REFERENCES public.allergies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: allergies_ingredients allergies_ingredients_id_ingredient_ingredients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.allergies_ingredients
    ADD CONSTRAINT allergies_ingredients_id_ingredient_ingredients_id_fk FOREIGN KEY (id_ingredient) REFERENCES public.ingredients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bills_details bills_details_id_bill_bills_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_details
    ADD CONSTRAINT bills_details_id_bill_bills_id_fk FOREIGN KEY (id_bill) REFERENCES public.bills(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: bills_details bills_details_id_ordered_dishes_ordered_dishes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills_details
    ADD CONSTRAINT bills_details_id_ordered_dishes_ordered_dishes_id_fk FOREIGN KEY (id_ordered_dishes) REFERENCES public.ordered_dishes(id) ON UPDATE CASCADE;


--
-- Name: bills bills_id_reservation_reservations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_id_reservation_reservations_id_fk FOREIGN KEY (id_reservation) REFERENCES public.reservations(id) ON UPDATE CASCADE;


--
-- Name: bills bills_id_user_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bills
    ADD CONSTRAINT bills_id_user_users_id_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: dishes dishes_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes
    ADD CONSTRAINT dishes_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dishes_ingredients dishes_ingredients_id_dish_dishes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_ingredients
    ADD CONSTRAINT dishes_ingredients_id_dish_dishes_id_fk FOREIGN KEY (id_dish) REFERENCES public.dishes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dishes_ingredients dishes_ingredients_id_ingredient_ingredients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_ingredients
    ADD CONSTRAINT dishes_ingredients_id_ingredient_ingredients_id_fk FOREIGN KEY (id_ingredient) REFERENCES public.ingredients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dishes_tags dishes_tags_id_dish_dishes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_tags
    ADD CONSTRAINT dishes_tags_id_dish_dishes_id_fk FOREIGN KEY (id_dish) REFERENCES public.dishes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: dishes_tags dishes_tags_id_tag_tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dishes_tags
    ADD CONSTRAINT dishes_tags_id_tag_tags_id_fk FOREIGN KEY (id_tag) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ingredients ingredients_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: opening_hours opening_hours_id_day_days_of_week_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opening_hours
    ADD CONSTRAINT opening_hours_id_day_days_of_week_id_fk FOREIGN KEY (id_day) REFERENCES public.days_of_week(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: opening_hours opening_hours_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opening_hours
    ADD CONSTRAINT opening_hours_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ordered_dishes ordered_dishes_id_dish_dishes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_dishes
    ADD CONSTRAINT ordered_dishes_id_dish_dishes_id_fk FOREIGN KEY (id_dish) REFERENCES public.dishes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ordered_dishes ordered_dishes_id_reservation_reservations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_dishes
    ADD CONSTRAINT ordered_dishes_id_reservation_reservations_id_fk FOREIGN KEY (id_reservation) REFERENCES public.reservations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ordered_dishes ordered_dishes_id_user_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ordered_dishes
    ADD CONSTRAINT ordered_dishes_id_user_users_id_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- Name: removed_ingredients removed_ingredients_id_ingredient_ingredients_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.removed_ingredients
    ADD CONSTRAINT removed_ingredients_id_ingredient_ingredients_id_fk FOREIGN KEY (id_ingredient) REFERENCES public.ingredients(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: removed_ingredients removed_ingredients_id_ordered_dish_ordered_dishes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.removed_ingredients
    ADD CONSTRAINT removed_ingredients_id_ordered_dish_ordered_dishes_id_fk FOREIGN KEY (id_ordered_dish) REFERENCES public.ordered_dishes(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reservations reservations_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservations
    ADD CONSTRAINT reservations_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: restaurants restaurants_id_address_addresses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants
    ADD CONSTRAINT restaurants_id_address_addresses_id_fk FOREIGN KEY (id_address) REFERENCES public.addresses(id) ON UPDATE CASCADE;


--
-- Name: restaurants_tags restaurants_tags_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants_tags
    ADD CONSTRAINT restaurants_tags_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: restaurants_tags restaurants_tags_id_tag_tags_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.restaurants_tags
    ADD CONSTRAINT restaurants_tags_id_tag_tags_id_fk FOREIGN KEY (id_tag) REFERENCES public.tags(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_id_restaurant_restaurants_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_id_restaurant_restaurants_id_fk FOREIGN KEY (id_restaurant) REFERENCES public.restaurants(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: reviews reviews_id_user_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_id_user_users_id_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: transactions_logs transactions_logs_id_bill_bills_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.transactions_logs
    ADD CONSTRAINT transactions_logs_id_bill_bills_id_fk FOREIGN KEY (id_bill) REFERENCES public.bills(id) ON UPDATE CASCADE;


--
-- Name: users_allergies users_allergies_id_allergy_allergies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_allergies
    ADD CONSTRAINT users_allergies_id_allergy_allergies_id_fk FOREIGN KEY (id_allergy) REFERENCES public.allergies(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_allergies users_allergies_id_user_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_allergies
    ADD CONSTRAINT users_allergies_id_user_users_id_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_reservations users_reservations_id_reservation_reservations_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reservations
    ADD CONSTRAINT users_reservations_id_reservation_reservations_id_fk FOREIGN KEY (id_reservation) REFERENCES public.reservations(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users_reservations users_reservations_id_user_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_reservations
    ADD CONSTRAINT users_reservations_id_user_users_id_fk FOREIGN KEY (id_user) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

