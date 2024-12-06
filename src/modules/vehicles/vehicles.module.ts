import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from '../../app.providers';
import { DatabaseModule } from '../../db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [VehiclesController],
  providers: [VehiclesService, ...appProviders],
})
export class VehiclesModule {}
