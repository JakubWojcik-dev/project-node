import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { ResponseData } from 'src/types/app';

@Controller()
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Get('planets')
  async getPlanets(@Query('count') page?: string): Promise<ResponseData> {
    return await this.planetsService.getPlanets(Number(page));
  }

  @Get('planets/:id')
  async getPlanetsById(@Param('id') id: string): Promise<Response> {
    return await this.planetsService.getPlanetById(id);
  }
}
