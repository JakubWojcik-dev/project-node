import { Controller, Get, Param, Query } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';

import { ResponseData } from '../../types/app';

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
