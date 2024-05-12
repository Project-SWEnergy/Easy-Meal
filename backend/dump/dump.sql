--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
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

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

--
-- Name: bill_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.bill_state AS ENUM (
    'In corso',
    'Rifiutato',
    'Concluso'
);


ALTER TYPE public.bill_state OWNER TO postgres;

--
-- Name: transaction_state; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.transaction_state AS ENUM (
    'In corso',
    'Rifiutato',
    'Concluso'
);


ALTER TYPE public.transaction_state OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


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
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


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
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	6c7f116cdbcf9b7831dd9d86a775236ee972868910cc27aa66f3a35c24827857	1713796533328
2	826485e19eb558802991a1aef41643bcb95edc61e445eb8318f53e3bf8610142	1713878626446
3	bc8940d59c5a5027da01c34668c6a1ee1fc25ed9c497c90550aa64aca973cd26	1714239536026
4	3344227363093456d846193cc229c071cefeb8f25766ab3ede271541dbd6ef19	1714582817225
\.


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses (id, state, city, street, street_number, zip_code) FROM stdin;
1	Italia	Padova	Via Vai	1A	35100
3	Italia	Padova	Via Vai	1A	35101
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
25	3	3	2024-04-05 08:30:00+00	12.45	Concluso
26	3	3	2024-04-05 08:30:00+00	12.45	Concluso
27	3	3	2024-04-05 08:30:00+00	12.45	Concluso
28	3	3	2024-04-05 08:30:00+00	12.45	Concluso
29	3	3	2024-04-05 08:30:00+00	12.45	Concluso
31	3	3	2024-04-05 08:30:00+00	12.45	Concluso
\.


--
-- Data for Name: bills_details; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bills_details (id, id_ordered_dishes, id_bill) FROM stdin;
43	25	25
44	24	25
45	25	26
46	24	26
47	25	27
48	24	27
49	25	28
50	24	28
51	25	29
52	24	29
\.


--
-- Data for Name: days_of_week; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.days_of_week (id, name, abbreviation, "order") FROM stdin;
1	Lunedì	LUN	1
2	Martedì	MAR	2
\.


--
-- Data for Name: dishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishes (id, id_restaurant, name, description, price, image) FROM stdin;
2	1	asd	sad	12	asdad
1	1	test	Test	14	asd
\.


--
-- Data for Name: dishes_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.dishes_ingredients (id_dish, id_ingredient, quantity) FROM stdin;
1	2	10
2	2	10
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
1	1	test	\N
2	1	qwqe	\N
3	1	wqeqwe	\N
\.


--
-- Data for Name: opening_hours; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opening_hours (id, id_restaurant, id_day, opening_time, closing_time) FROM stdin;
3	2	1	09:00:00	12:00:00
4	2	1	15:00:00	18:00:00
5	2	1	09:00:00	12:00:00
6	2	1	15:00:00	18:00:00
\.


--
-- Data for Name: ordered_dishes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ordered_dishes (id, id_user, id_reservation, id_dish, paid) FROM stdin;
25	3	3	2	t
24	3	3	2	t
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
3	1	2024-04-05 08:30:00+00	12	In attesa	Equidiviso	2
\.


--
-- Data for Name: restaurants; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants (id, email, password, name, owner_name, owner_surname, id_address, seats, website, price_tier, description, phone, childrenn_seats, accessibility, logo, banner_image) FROM stdin;
1	ristorante222@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$nwyTdi3lkMsRm0kI3I6RkQ$xoEakoHHj+3MrwL0QlMBrsuQxhAAlLcmiGJcQv5zf8E	Nome1	Paolo	Paoli	1	12	\N	2	Descrizione	3333333333	\N	\N		
2	ristorante@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$hNkdFPkypqwp6WGDkr8Y2g$U5eCOkR5bUqQ7nQggpBfbo1+UKGOuhiiy9g2pg2sglQ	Nome1	Paolo	Paoli	3	12	\N	2	Descrizione	3333333333	\N	\N	test	
\.


--
-- Data for Name: restaurants_tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.restaurants_tags (id_tag, id_restaurant) FROM stdin;
1	2
2	2
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
1	1	asd
2	2	sadsad
\.


--
-- Data for Name: transactions_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.transactions_logs (id, id_bill, date, transaction_state, message) FROM stdin;
15	25	2024-05-01 17:30:53.414+00	Concluso	Transazione effettuata correttamente
16	26	2024-05-01 17:30:54.964+00	Concluso	Transazione effettuata correttamente
17	27	2024-05-01 17:30:56.505+00	Concluso	Transazione effettuata correttamente
18	28	2024-05-01 17:30:58.045+00	Concluso	Transazione effettuata correttamente
19	29	2024-05-01 17:31:00.625+00	Concluso	Transazione effettuata correttamente
20	31	2024-05-01 17:42:10.856+00	Concluso	Transazione effettuata correttamente
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, surname, email, password) FROM stdin;
1	Cliente	Abituale	cliente@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$LqSiQdks2iTprl0v9SRPSw$7WaoBJE57w1bzNLdO7802MAR88Xdofalxsc8aboPins
3	Cliente	Abituale	cliente1@gmail.com	$argon2id$v=19$m=65536,t=3,p=4$vTwzLaVi3Jw9v6tg2a9ZGA$HERKqWwHy8DIYC8i5wqrp31UAdlQZMKX3++PpXr+H0I
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
3	3	t
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 4, true);


--
-- Name: addresses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.addresses_id_seq', 3, true);


--
-- Name: allergies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.allergies_id_seq', 1, false);


--
-- Name: bills_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_details_id_seq', 52, true);


--
-- Name: bills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bills_id_seq', 31, true);


--
-- Name: days_of_week_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.days_of_week_id_seq', 2, true);


--
-- Name: dishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.dishes_id_seq', 2, true);


--
-- Name: ingredients_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_id_seq', 3, true);


--
-- Name: opening_hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opening_hours_id_seq', 6, true);


--
-- Name: ordered_dishes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ordered_dishes_id_seq', 25, true);


--
-- Name: reservations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservations_id_seq', 3, true);


--
-- Name: restaurants_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.restaurants_id_seq', 2, true);


--
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 2, true);


--
-- Name: transactions_logs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.transactions_logs_id_seq', 20, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


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

