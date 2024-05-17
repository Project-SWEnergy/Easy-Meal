import { primaryKey, real, time, integer, timestamp, pgTable, serial, varchar, pgEnum, boolean, unique, decimal } from 'drizzle-orm/pg-core'

export const users = pgTable("users",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 50 }).notNull(),
		surname: varchar("surname", { length: 50 }).notNull(),
		email: varchar("email", { length: 50 }).unique().notNull(),
		password: varchar("password", { length: 255 }).notNull(),
	}
);

export const addresses = pgTable("addresses",
	{
		id: serial("id").primaryKey(),
		state: varchar("state", { length: 100 }).notNull(),
		city: varchar("city", { length: 100 }).notNull(),
		street: varchar("street", { length: 255 }).notNull(),
		street_number: varchar("street_number", { length: 20 }).notNull(),
		zip_code: varchar("zip_code", { length: 10 }).notNull(),
	}, (table) => (
		{
			unique: unique('address').on(table.state, table.city, table.street, table.street_number, table.zip_code)
		})
);

export const allergies = pgTable("allergies",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 50 }).unique().notNull(),
		icon: varchar("icon", { length: 255 }).notNull(),
	}
);

export const users_allergies = pgTable("users_allergies",
	{
		id_user: integer("id_user").references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		id_allergy: integer("id_allergy").references(() => allergies.id, { onDelete: 'cascade', onUpdate: 'cascade' })
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_user, table.id_allergy]
				})
		}
	)
);

export const restaurants = pgTable("restaurants",
	{
		id: serial("id").primaryKey(),
		email: varchar("email", { length: 50 }).unique().notNull(),
		password: varchar("password", { length: 255 }).notNull(),
		name: varchar("name", { length: 50 }).notNull(),
		owner_name: varchar("owner_name", { length: 50 }).notNull(),
		owner_surname: varchar("owner_surname", { length: 50 }).notNull(),
		id_address: integer("id_address").references(() => addresses.id, { onUpdate: 'cascade' }).notNull(),
		seats: integer("seats").notNull(),
		website: varchar("website", { length: 255 }),
		price_tier: integer("price_tier").notNull(),
		description: varchar("description", { length: 255 }).notNull(),
		phone: varchar("phone", { length: 13 }).notNull(),
		childrenn_seats: integer("childrenn_seats"),
		accessibility: boolean("accessibility"),
		logo: varchar("logo", { length: 255 }).default(""),
		banner_image: varchar("banner_image", { length: 255 }).default("")
	}
);

export const days_of_week = pgTable("days_of_week",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 20 }).notNull().unique(),
		abbreviation: varchar("abbreviation", { length: 5 }).notNull().unique(),
		order: integer("order").notNull()
	}
);

export const opening_hours = pgTable("opening_hours",
	{
		id: serial("id").primaryKey(),
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_day: integer("id_day")
			.references(() => days_of_week.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		opening_time: time("opening_time").notNull(),
		closing_time: time("closing_time").notNull()
	}
);

export const tags = pgTable("tags",
	{
		id: serial("id").primaryKey(),
		name: varchar("name", { length: 50 }).notNull().unique(),
		description: varchar("description", { length: 255 })
	}
);

export const restaurants_tags = pgTable("restaurants_tags",
	{
		id_tag: integer("id_tag")
			.references(() => tags.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull()
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_tag, table.id_restaurant]
				})
		}
	)
);

export const dishes = pgTable("dishes",
	{
		id: serial("id").primaryKey(),
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		name: varchar("name", { length: 50 }).notNull(),
		description: varchar("description", { length: 255 }).notNull(),
		price: real("price").notNull(),
		image: varchar("image", { length: 255 }).notNull()
	}
);

export const dishes_tags = pgTable("dishes_tags",
	{
		id_tag: integer("id_tag")
			.references(() => tags.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_dish: integer("id_dish")
			.references(() => dishes.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull()
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_tag, table.id_dish]
				})
		}
	)
);

export const ingredients = pgTable("ingredients",
	{
		id: serial("id").primaryKey(),
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		name: varchar("name", { length: 50 }).notNull(),
		unit_of_measurement: varchar("unit_of_measurement", { length: 5 })
	}
);

export const dishes_ingredients = pgTable("dishes_ingredients",
	{
		id_dish: integer("id_dish")
			.references(() => dishes.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_ingredient: integer("id_ingredient")
			.references(() => ingredients.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		quantity: real("quantity")
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_dish, table.id_ingredient]
				})
		}
	)
);


export const removed_ingredients = pgTable("removed_ingredients",
	{
		id_ordered_dish: integer("id_ordered_dish")
			.references(() => ordered_dishes.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_ingredient: integer("id_ingredient")
			.references(() => ingredients.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull()
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_ordered_dish, table.id_ingredient]
				})
		}
	)
);


export const allergies_ingredients = pgTable("allergies_ingredients",
	{
		id_allergy: integer("id_allergy")
			.references(() => allergies.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_ingredient: integer("id_ingredient")
			.references(() => ingredients.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_allergy, table.id_ingredient]
				})
		}
	)
);

export const reservations = pgTable("reservations",
	{
		id: serial("id").primaryKey(),
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		date: timestamp('date', { withTimezone: true, mode: "date" }).notNull(),
		partecipants: integer("partecipants").notNull(),
		reservation_state: varchar("reservation_state", { length: 50 }).notNull(),
		bill_splitting_method: varchar("bill_splitting_method", { length: 50 }).notNull(),
		paid_orders: integer("paid_orders").notNull()
	}
);

export const reviews = pgTable("reviews",
	{
		id_restaurant: integer("id_restaurant")
			.references(() => restaurants.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_user: integer("id_user")
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		date: timestamp('date', { withTimezone: true, mode: "date" }).notNull(),
		score: integer("score").notNull(),
		description: varchar("description", { length: 255 }).notNull(),
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_restaurant, table.id_user]
				})
		}
	)
);

export const users_reservations = pgTable("users_reservations",
	{
		id_user: integer("id_user")
			.references(() => users.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_reservation: integer("id_reservation")
			.references(() => reservations.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		accepted: boolean("accepted")
			.default(false)
	}, (table) => (
		{
			primaryKey: primaryKey(
				{
					columns: [table.id_user, table.id_reservation]
				})
		}
	)
);

export const ordered_dishes = pgTable("ordered_dishes",
	{
		id: serial("id").primaryKey(),
		id_user: integer("id_user")
			.references(() => users.id, { onUpdate: 'cascade' })
			.notNull(),
		id_reservation: integer("id_reservation")
			.references(() => reservations.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		id_dish: integer("id_dish")
			.references(() => dishes.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
		paid: boolean("paid")
	}
);

export const bills = pgTable("bills",
	{
		id: serial("id").primaryKey(),
		id_user: integer("id_user")
			.references(() => users.id, { onUpdate: 'cascade' })
			.notNull(),
		id_reservation: integer("id_reservation")
			.references(() => reservations.id, { onUpdate: 'cascade',onDelete: 'no action' })
			.notNull(),
		date: timestamp('date', { withTimezone: true, mode: "date" }).notNull(),
		total_bill: real("total_bill").notNull(),
		bill_state:  varchar("bill_state", { length: 50 }).notNull()
	}
);

export const transactions_logs = pgTable("transactions_logs",
	{
		id: serial("id").primaryKey(),
		id_bill: integer("id_bill")
			.references(() => bills.id, { onUpdate: 'cascade', onDelete: 'no action' })
			.notNull(),
		timestamp: timestamp('date', { withTimezone: true, mode: "date" }).notNull(),
		transaction_state: varchar("transaction_state", { length: 50 }).notNull(),
		message: varchar("message", { length: 255 }).notNull(),
	}
);

export const bills_details = pgTable("bills_details",
	{
		id: serial("id").primaryKey(),
		id_ordered_dishes: integer("id_ordered_dishes")
			.references(() => ordered_dishes.id, { onUpdate: 'cascade', onDelete: 'no action'})
			.notNull(),
		id_bill: integer("id_bill")
			.references(() => bills.id, { onDelete: 'cascade', onUpdate: 'cascade' })
			.notNull(),
	}
);

export const notifications = pgTable("notifications",
	{
		id: serial("id").primaryKey(),
		title: varchar("title", { length: 255 }).notNull(),
		message: varchar("message", { length: 255 }).notNull(),
		id_receiver: integer("id_receiver").notNull(),
		role: varchar("role", { length: 255 }).notNull(),
		visualized: boolean("visualized").default(false).notNull()
	}
);