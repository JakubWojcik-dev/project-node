import { Controller, Get, Param, Query } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { ResponseData } from '../../types/app';

@Controller()
export class SpeciesController {
  constructor(private readonly speciesService: SpeciesService) {}

  @Get('species')
  async getSpecies(@Query('count') page?: string): Promise<ResponseData> {
    return await this.speciesService.getSpecies(Number(page));
  }

  @Get('species/:id')
  async getSpeciesById(@Param('id') id: string): Promise<Response> {
    return await this.speciesService.getSpeciesById(id);
  }
}
