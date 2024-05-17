import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres'
import * as schema from '../../db/schema'

@Injectable()
export class DatabaseService {
    private client: Client;
    private isConnected: boolean = false;

    constructor(private configService: ConfigService) {
        this.startConnection();
    }

    startConnection() {
        this.generateClient();
        this.connectClient();
    }

    generateClient(): void {
        this.client = new Client({
            connectionString: this.configService.get<string>('DATABASE_URL'),
            connectionTimeoutMillis: 0
        });
        this.client.on('error', (error) => {
            this.isConnected = false;
            //console.error('GenerateClient error: \n', error.message);
        });
        this.client.on('end', () => {
            this.isConnected = false;
            //console.log('Database client connection ended');
            this.startConnection();
        });
    }

    connectClient(): void {
        try {
            this.client.connect();
            this.isConnected = true;
            console.log('Connected to database.');
        }
        catch (error) {
            console.error('ConnectClient error: \n', error);
            this.isConnected = false;
        }
    }

    getDatabase() {
        try {
            while (!this.isConnected) {
                try {
                    this.startConnection();
                } catch (error) {
                    console.error('Connection to database failed: \n', error);
                    this.isConnected = false;
                }
            }
            if (!this.isConnected)
                throw new Error("Connection error.");
            const database = drizzle(this.client, { schema: schema });
            return database;
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    async closeConnection() {
        try {
            await this.client.end();
            console.log('Database connection closed.');
        } catch (error) {
            console.error('Error closing database connection: \n', error);
        }
    }

    async onApplicationShutdown(signal?: string) {
        await this.closeConnection();
    }

}
