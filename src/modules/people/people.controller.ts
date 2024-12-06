import { Controller, Get, Param, Query } from '@nestjs/common';
import { PeopleService } from './people.service';
import { ResponseData } from '../../types/app';

@Controller()
export class PeopleController {
  constructor(private readonly peopleService: PeopleService) {}

  @Get('people')
  async getPeople(@Query('count') page?: string): Promise<ResponseData> {
    return await this.peopleService.getPeople(Number(page));
  }

  @Get('people/:id')
  async getPersonById(@Param('id') id: string): Promise<Response> {
    return await this.peopleService.getPersonById(id);
  }
  @Get('mostCommonPerson')
  async getMostCommonPerson(): Promise<Object[]> {
    return await this.peopleService.getMostCommonPerson();
  }
}
