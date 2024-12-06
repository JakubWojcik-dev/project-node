import { Module } from '@nestjs/common';
import { databaseTestProviders } from './db.providersTest';

@Module({
  providers: [...databaseTestProviders],
  exports: [...databaseTestProviders],
})
export class DatabaseTestModule {}
