import { Module } from '@nestjs/common';
import { SpeciesController } from './species.controller';
import { SpeciesService } from './species.service';

import { ConfigModule } from '@nestjs/config';
import { appProviders } from 'src/app.providers';
import { DatabaseModule } from 'src/db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [SpeciesController],
  providers: [SpeciesService, ...appProviders],
})
export class speciesModule {}
