import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from '../../app.providers';
import { DatabaseModule } from '../../db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [StarshipsController],
  providers: [StarshipsService, ...appProviders],
})
export class starshipsModule {}
