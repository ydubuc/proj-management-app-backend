import { Options } from 'express-rate-limit';

export const rateLimitOptions: Options = {
    windowMs: 15 * 60 * 1000,
    max: 100,
};
