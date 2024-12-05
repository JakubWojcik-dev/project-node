import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Cache } from 'src/db/db.schema';

@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('films')
  async getFilms(
    @Query('count') page?: string,
  ): Promise<{ count: number; data: any[] }> {
    return await this.filmsService.getFilms(Number(page));
  }

  @Get('films/:id')
  async getFilmsById(@Param('id') id: string): Promise<Response> {
    return await this.filmsService.getFilmsById(id);
  }
}
