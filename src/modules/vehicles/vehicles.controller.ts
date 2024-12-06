import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { Cache } from 'src/db/db.schema';
import { ResponseData } from 'src/types/app';
// import { CreateCacheDto } from './dto/createCat.dto';

@Controller()
export class VehiclesController {
  constructor(private readonly vehiclesService: VehiclesService) {}

  @Get('vehicles')
  async getVehicles(@Query('count') page?: string): Promise<ResponseData> {
    return await this.vehiclesService.getVehicles(Number(page));
  }

  @Get('vehicles/:id')
  async getVehiclesById(@Param('id') id: string): Promise<Response> {
    return await this.vehiclesService.getVehiclesById(id);
  }
}
