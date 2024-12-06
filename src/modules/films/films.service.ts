import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cache } from 'src/db/db.schema';
import { findIndexInDb, saveToDb, trimMessage } from 'src/helpers';
import { ResponseData } from 'src/types/app';

@Injectable()
export class FilmsService {
  constructor(
    @Inject('CACHE_MODEL')
    private cacheModel: Model<Cache>,
  ) {}

  putDataIntoArray(msg: string): any[] {
    const words = msg.split(' ');
    const filterWords = words
      .map((word) => word.toLowerCase())
      .filter((word) => word !== '');
    // Count occurrences using an object
    const wordsObject = {};

    filterWords.forEach((word) => {
      wordsObject[word] = (wordsObject[word] || 0) + 1;
    });

    const pairsOfArray = Object.entries(wordsObject);

    return pairsOfArray;
  }
  async getFilms(pagination?: number): Promise<ResponseData> {
    const url = `${process.env.URL}/films`;
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
          data: data.data.results.splice(0, pagination),
        }
      : {
          count: data.data.count,
          data: data.data.results,
        };
  }
  async getFilmsById(id: string): Promise<Response> {
    const url = `${process.env.URL}/films`;
    let data = await findIndexInDb(url, this.cacheModel, id);
    if (!data) {
      data = await fetch(`${url}/${id}`).then((response: Response) =>
        response.json(),
      );
      await saveToDb(`${url}/${id}`, data, this.cacheModel);
      return data;
    }

    return data.data;
  }

  async getFilmsOpeningCrawl(): Promise<any[]> {
    const url = `${process.env.URL}/films`;
    let data = await findIndexInDb(url, this.cacheModel);
    if (!data) {
      data = await fetch(url).then((response: Response) => response.json());
      await saveToDb(url, data, this.cacheModel);
      const msg = trimMessage(data);
      return this.putDataIntoArray(msg);
    }

    const msg = trimMessage(data);
    return this.putDataIntoArray(msg);
  }
}
