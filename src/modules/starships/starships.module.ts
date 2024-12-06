import { Module } from '@nestjs/common';
import { StarshipsController } from './starships.controller';
import { StarshipsService } from './starships.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from 'src/app.providers';
import { DatabaseModule } from 'src/db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [StarshipsController],
  providers: [StarshipsService, ...appProviders],
})
export class starshipsModule {}