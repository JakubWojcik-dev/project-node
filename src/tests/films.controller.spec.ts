import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../modules/films/films.service';
import { getModelToken } from '@nestjs/mongoose';
import { HttpService } from '@nestjs/axios';
import { DatabaseTestModule } from '../db/testModule/db.moduleTest';
import { ConfigModule } from '@nestjs/config';
import { appProviders } from '../app.providers';
import { PeopleController } from '../modules/people/people.controller';
import { PeopleService } from '../modules/people/people.service';
import { FilmsController } from '../modules/films/films.controller';

describe('FilmsService', () => {
  let service: FilmsService;
  let peopleService: PeopleService;

  const mockFilmModel = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  const mockHttpService = {
    get: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseTestModule, ConfigModule.forRoot({ isGlobal: true })],
      controllers: [FilmsController, PeopleController],
      providers: [
        FilmsService,
        PeopleService,
        ...appProviders,

        { provide: getModelToken('CACHE_MODEL'), useValue: mockFilmModel },
        { provide: HttpService, useValue: mockHttpService },
      ],
    }).compile();

    service = module.get(FilmsService);
    peopleService = module.get(PeopleService);
  });

  it('check if return a proper films count', async () => {
    const result = await service.getFilms();
    expect(result.count).toEqual(6);
  });

  it('check if return an error by requesting a film by wrong id', async () => {
    const result: any = await service.getFilmsById('7');
    expect(result).toEqual({ detail: 'Not found' });
  });

  it('check if request return a proper word counts data', async () => {
    const result = await service.getFilmsOpeningCrawl();

    expect(result[2]).toEqual(['a', 9]);
    expect(result[7]).toEqual(['rebel', 3]);
    expect(result[12]).toEqual(['base', 3]);
  });
  it('return most common persons', async () => {
    const result = await peopleService.getMostCommonPerson();

    expect(result).toEqual([
      {
        count: 2,
        name: 'Luke Skywalker',
      },
      {
        count: 2,
        name: 'Dooku',
      },
    ]);
  });
});
