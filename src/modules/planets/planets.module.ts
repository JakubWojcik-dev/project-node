import { Module } from '@nestjs/common';
import { PlanetsController } from './planets.controller';
import { PlanetsService } from './planets.service';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from 'src/app.providers';
import { DatabaseModule } from 'src/db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PlanetsController],
  providers: [PlanetsService, ...appProviders],
})
export class PlanetsModule {}