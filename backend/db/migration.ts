import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';

const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL 
});

const db = drizzle(pool);

async function main() {
	console.log(process.env.DATABASE_URL);
	console.log("Migrating database...");
	await migrate(db, { migrationsFolder: "drizzle" });
	console.log("Done.");
	process.exit(0);
}

main().catch(err => {
	console.error(err);
	process.exit(1);
});
