import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Cache } from 'src/db/db.schema';
// import { CreateCacheDto } from './dto/createCat.dto';

@Controller()
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get('films')
  async getFilms(): Promise<{ count: number; data: any[] }> {
    return await this.filmsService.getFilms();
  }

  @Get('films/:id')
  async getFilmsById(@Param('id') id: string): Promise<Response> {
    return await this.filmsService.getFilmsById(id);
  }
}
