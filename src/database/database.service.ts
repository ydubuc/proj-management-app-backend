import * as mongoose from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { mongooseConfig } from '../config/mongoose.config';
import { DATABASE_RECONNECT_TIMER } from '../config/globals';

@Injectable()
export class DatabaseService {
    private db = mongoose.connection;
    private logger = new Logger('DatabaseService');

    constructor() {
        this.connectDb();
    }

    private async connectDb(): Promise<mongoose.Connection> {
        this.db.on('open', () => this.logger.log('OPEN'));
        this.db.on('connecting', () => this.logger.log('CONNECTING'));
        this.db.on('disconnected', () => this.logger.log('DISCONNECTED'));
        this.db.on('reconnecting', () => this.logger.log('RECONNECTING'));
        this.db.on('error', () => this.logger.log('ERROR'));
        this.db.on('unhandledRejection', () => this.logger.error('UNHANDLED'));
        return this.makeDbConnection();
    }

    private async makeDbConnection(): Promise<mongoose.Connection> {
        const USER = process.env.DB_USER;
        const PASS = process.env.DB_PASS;
        const DOMAIN = process.env.DB_DOMAIN;
        const NAME = process.env.DB_NAME;
        const ADDRESS = `mongodb+srv://${USER}:${PASS}@${DOMAIN}/${NAME}?retryWrites=true&w=majority`;

        try {
            await mongoose.connect(ADDRESS, mongooseConfig);
            return mongoose.connection;
        } catch (error) {
            this.logger.error(error);
            setTimeout(() => this.makeDbConnection(), DATABASE_RECONNECT_TIMER);
        }
    }
}
