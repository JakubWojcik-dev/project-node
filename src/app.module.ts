import { Module } from '@nestjs/common';
import { DatabaseModule } from './db/db.module';
import { appProviders } from './app.providers';
import { ConfigModule } from '@nestjs/config';
import {
  FilmsModule,
  PeopleModule,
  PlanetsModule,
  speciesModule,
  starshipsModule,
  VehiclesModule,
} from './modules/index';

@Module({
  imports: [
    DatabaseModule,
    FilmsModule,
    PeopleModule,
    PlanetsModule,
    speciesModule,
    starshipsModule,
    VehiclesModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  controllers: [],
  providers: [...appProviders],
})
export class AppModule {}
