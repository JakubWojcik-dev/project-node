import { Connection } from 'mongoose';

import { CacheSchema } from './db/db.schema';
export const appProviders = [
  {
    provide: 'CACHE_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Cache', CacheSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
