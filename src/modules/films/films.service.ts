import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cache } from 'src/db/db.schema';
import { findIndexInDb, saveToDb } from 'src/helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CACHE_MODEL')
    private cacheModel: Model<Cache>,
  ) {}

  async getFilms(): Promise<{ count: number; data: any[] }> {
    const url = `${process.env.URL}/films`;
    let data = await findIndexInDb(url, this.cacheModel);
    if (!data) {
      data = await fetch(`${url}/?page={$}`).then((response: Response) =>
        response.json(),
      );

      let resultsArray = [...data.results];
      let page = 1;
      const count = data.count;
      do {
        page++;
        data = await fetch(`${url}/?page=${page}`).then((response: Response) =>
          response.json(),
        );
        resultsArray = [...resultsArray, ...data.results];
      } while (count > page * 10);
      await saveToDb(url, data, this.cacheModel);

      return {
        count: data.count,
        data: resultsArray,
      };
    }

    return data;
  }
  async getFilmsById(id: string): Promise<Response> {
    const url = `${process.env.URL}/films`;
    let data = await findIndexInDb(url, this.cacheModel, id);
    if (!data) {
      data = await fetch(url).then((response: Response) => response.json());
      await saveToDb(`${url}/${id}`, data, this.cacheModel);
      return data;
    }

    return data.data;
  }
}
