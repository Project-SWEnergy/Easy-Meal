CREATE TABLE IF NOT EXISTS "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"state" varchar(100) NOT NULL,
	"city" varchar(100) NOT NULL,
	"street" varchar(255) NOT NULL,
	"street_number" varchar(20) NOT NULL,
	"zip_code" varchar(10) NOT NULL,
	CONSTRAINT "address" UNIQUE("state","city","street","street_number","zip_code")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"icon" varchar(255) NOT NULL,
	CONSTRAINT "allergies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "allergies_ingredients" (
	"id_allergy" integer NOT NULL,
	"id_ingredient" integer NOT NULL,
	CONSTRAINT "allergies_ingredients_id_allergy_id_ingredient_pk" PRIMARY KEY("id_allergy","id_ingredient")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bills" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"id_reservation" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"total_bill" real NOT NULL,
	"bill_state" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bills_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_ordered_dishes" integer NOT NULL,
	"id_bill" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "days_of_week" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(20) NOT NULL,
	"abbreviation" varchar(5) NOT NULL,
	"order" integer NOT NULL,
	CONSTRAINT "days_of_week_name_unique" UNIQUE("name"),
	CONSTRAINT "days_of_week_abbreviation_unique" UNIQUE("abbreviation")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_restaurant" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255) NOT NULL,
	"price" real NOT NULL,
	"image" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_ingredients" (
	"id_dish" integer NOT NULL,
	"id_ingredient" integer NOT NULL,
	"quantity" real,
	CONSTRAINT "dishes_ingredients_id_dish_id_ingredient_pk" PRIMARY KEY("id_dish","id_ingredient")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "dishes_tags" (
	"id_tag" integer NOT NULL,
	"id_dish" integer NOT NULL,
	CONSTRAINT "dishes_tags_id_tag_id_dish_pk" PRIMARY KEY("id_tag","id_dish")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_restaurant" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"unit_of_measurement" varchar(5)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notifications" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"message" varchar(255) NOT NULL,
	"id_receiver" integer NOT NULL,
	"role" varchar(255) NOT NULL,
	"visualized" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "opening_hours" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_restaurant" integer NOT NULL,
	"id_day" integer NOT NULL,
	"opening_time" time NOT NULL,
	"closing_time" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ordered_dishes" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_user" integer NOT NULL,
	"id_reservation" integer NOT NULL,
	"id_dish" integer NOT NULL,
	"paid" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "removed_ingredients" (
	"id_ordered_dish" integer NOT NULL,
	"id_ingredient" integer NOT NULL,
	CONSTRAINT "removed_ingredients_id_ordered_dish_id_ingredient_pk" PRIMARY KEY("id_ordered_dish","id_ingredient")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reservations" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_restaurant" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"partecipants" integer NOT NULL,
	"reservation_state" varchar(50) NOT NULL,
	"bill_splitting_method" varchar(50) NOT NULL,
	"paid_orders" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	"name" varchar(50) NOT NULL,
	"owner_name" varchar(50) NOT NULL,
	"owner_surname" varchar(50) NOT NULL,
	"id_address" integer NOT NULL,
	"seats" integer NOT NULL,
	"website" varchar(255),
	"price_tier" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	"phone" varchar(13) NOT NULL,
	"childrenn_seats" integer,
	"accessibility" boolean,
	"logo" varchar(255) DEFAULT '',
	"banner_image" varchar(255) DEFAULT '',
	CONSTRAINT "restaurants_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants_tags" (
	"id_tag" integer,
	"id_restaurant" integer NOT NULL,
	CONSTRAINT "restaurants_tags_id_tag_id_restaurant_pk" PRIMARY KEY("id_tag","id_restaurant")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"id_restaurant" integer NOT NULL,
	"id_user" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"score" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "reviews_id_restaurant_id_user_pk" PRIMARY KEY("id_restaurant","id_user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tags" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"description" varchar(255),
	CONSTRAINT "tags_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transactions_logs" (
	"id" serial PRIMARY KEY NOT NULL,
	"id_bill" integer NOT NULL,
	"date" timestamp with time zone NOT NULL,
	"transaction_state" varchar(50) NOT NULL,
	"message" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"surname" varchar(50) NOT NULL,
	"email" varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_allergies" (
	"id_user" integer,
	"id_allergy" integer,
	CONSTRAINT "users_allergies_id_user_id_allergy_pk" PRIMARY KEY("id_user","id_allergy")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users_reservations" (
	"id_user" integer NOT NULL,
	"id_reservation" integer NOT NULL,
	"accepted" boolean DEFAULT false,
	CONSTRAINT "users_reservations_id_user_id_reservation_pk" PRIMARY KEY("id_user","id_reservation")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "allergies_ingredients" ADD CONSTRAINT "allergies_ingredients_id_allergy_allergies_id_fk" FOREIGN KEY ("id_allergy") REFERENCES "allergies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "allergies_ingredients" ADD CONSTRAINT "allergies_ingredients_id_ingredient_ingredients_id_fk" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bills" ADD CONSTRAINT "bills_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bills" ADD CONSTRAINT "bills_id_reservation_reservations_id_fk" FOREIGN KEY ("id_reservation") REFERENCES "reservations"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bills_details" ADD CONSTRAINT "bills_details_id_ordered_dishes_ordered_dishes_id_fk" FOREIGN KEY ("id_ordered_dishes") REFERENCES "ordered_dishes"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bills_details" ADD CONSTRAINT "bills_details_id_bill_bills_id_fk" FOREIGN KEY ("id_bill") REFERENCES "bills"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes" ADD CONSTRAINT "dishes_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_ingredients" ADD CONSTRAINT "dishes_ingredients_id_dish_dishes_id_fk" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_ingredients" ADD CONSTRAINT "dishes_ingredients_id_ingredient_ingredients_id_fk" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_tags" ADD CONSTRAINT "dishes_tags_id_tag_tags_id_fk" FOREIGN KEY ("id_tag") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "dishes_tags" ADD CONSTRAINT "dishes_tags_id_dish_dishes_id_fk" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "opening_hours" ADD CONSTRAINT "opening_hours_id_day_days_of_week_id_fk" FOREIGN KEY ("id_day") REFERENCES "days_of_week"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordered_dishes" ADD CONSTRAINT "ordered_dishes_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordered_dishes" ADD CONSTRAINT "ordered_dishes_id_reservation_reservations_id_fk" FOREIGN KEY ("id_reservation") REFERENCES "reservations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ordered_dishes" ADD CONSTRAINT "ordered_dishes_id_dish_dishes_id_fk" FOREIGN KEY ("id_dish") REFERENCES "dishes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "removed_ingredients" ADD CONSTRAINT "removed_ingredients_id_ordered_dish_ordered_dishes_id_fk" FOREIGN KEY ("id_ordered_dish") REFERENCES "ordered_dishes"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "removed_ingredients" ADD CONSTRAINT "removed_ingredients_id_ingredient_ingredients_id_fk" FOREIGN KEY ("id_ingredient") REFERENCES "ingredients"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reservations" ADD CONSTRAINT "reservations_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "restaurants_id_address_addresses_id_fk" FOREIGN KEY ("id_address") REFERENCES "addresses"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants_tags" ADD CONSTRAINT "restaurants_tags_id_tag_tags_id_fk" FOREIGN KEY ("id_tag") REFERENCES "tags"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants_tags" ADD CONSTRAINT "restaurants_tags_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_id_restaurant_restaurants_id_fk" FOREIGN KEY ("id_restaurant") REFERENCES "restaurants"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transactions_logs" ADD CONSTRAINT "transactions_logs_id_bill_bills_id_fk" FOREIGN KEY ("id_bill") REFERENCES "bills"("id") ON DELETE no action ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_allergies" ADD CONSTRAINT "users_allergies_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_allergies" ADD CONSTRAINT "users_allergies_id_allergy_allergies_id_fk" FOREIGN KEY ("id_allergy") REFERENCES "allergies"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_reservations" ADD CONSTRAINT "users_reservations_id_user_users_id_fk" FOREIGN KEY ("id_user") REFERENCES "users"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users_reservations" ADD CONSTRAINT "users_reservations_id_reservation_reservations_id_fk" FOREIGN KEY ("id_reservation") REFERENCES "reservations"("id") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
