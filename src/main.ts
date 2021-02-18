import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import { rateLimitOptions } from './config/rate-limit.options';

bootstrap();

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.use(helmet());
    app.use(rateLimit(rateLimitOptions));
    await app.listen(process.env.PORT || 3000);
}
