import * as mongoose from 'mongoose';

export const databaseTestProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect('mongodb://localhost/27017:27017'),
  },
];
