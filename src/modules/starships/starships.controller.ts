import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { ResponseData } from 'src/types/app';

@Controller()
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Get('starships')
  async getStarships(@Query('count') page?: string): Promise<ResponseData> {
    return await this.starshipsService.getStarships(Number(page));
  }

  @Get('starships/:id')
  async getStarshipsById(@Param('id') id: string): Promise<Response> {
    return await this.starshipsService.getStarshipsById(id);
  }
}
