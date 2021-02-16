import { ConnectionOptions } from 'mongoose';

export const mongooseConfig: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};
