import { Module } from '@nestjs/common';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from '../../app.providers';
import { DatabaseModule } from '../../db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [FilmsController],
  providers: [FilmsService, ...appProviders],
})
export class FilmsModule {}
