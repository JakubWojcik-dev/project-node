import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cache } from '../../db/db.schema';
import { findIndexInDb, saveToDb } from '../../helpers';
import { ResponseData } from '../../types/app';

@Injectable()
export class VehiclesService {
  constructor(
    @Inject('CACHE_MODEL')
    private cacheModel: Model<Cache>,
  ) {}

  async getVehicles(pagination?: number): Promise<ResponseData> {
    const url = `${process.env.URL}/vehicles`;
    let data = await findIndexInDb(url, this.cacheModel);

    if (!data) {
      data = await fetch(`${url}/?page=1`).then((response: Response) =>
        response.json(),
      );

      let resultsArray = [...data.results];
      let page = 1;
      let count = data.count;

      do {
        page++;
        data = await fetch(`${url}/?page=${page}`).then((response: Response) =>
          response.json(),
        );
        resultsArray = [...resultsArray, ...data.results];
      } while (count > page * 10 || pagination > page * 10);

      if (pagination) {
        resultsArray = resultsArray.slice(0, pagination);
        count = pagination;
      }

      await saveToDb(
        url,
        {
          count: count,
          data: resultsArray,
        },
        this.cacheModel,
      );

      return {
        count: count,
        data: resultsArray,
      };
    }

    return pagination
      ? {
          count: pagination,
          data: data.results.splice(0, pagination),
        }
      : data;
  }
  async getVehiclesById(id: string): Promise<Response> {
    const url = `${process.env.URL}/vehicles`;
    let data = await findIndexInDb(url, this.cacheModel, id);

    if (!data) {
      data = await fetch(`${url}/${id}`).then((response: Response) =>
        response.json(),
      );
      await saveToDb(`${url}/${id}`, data, this.cacheModel);

      return data;
    }

    return data;
  }
}
