import { Module } from '@nestjs/common';
import { PeopleController } from './people.controller';
import { PeopleService } from './people.service';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from 'src/app.providers';
import { DatabaseModule } from 'src/db/db.module';
@Module({
  imports: [DatabaseModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [PeopleController],
  providers: [PeopleService, ...appProviders],
})
export class PeopleModule {}
