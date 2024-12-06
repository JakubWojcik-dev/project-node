import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cache } from '../../db/db.schema';
import { findIndexInDb, saveToDb, trimMessage } from '../../helpers';
import { ConfigService } from '@nestjs/config';
import { ResponseData } from '../../types/app';

@Injectable()
export class PeopleService {
  constructor(
    @Inject('CACHE_MODEL')
    private cacheModel: Model<Cache>,
  ) {}

  async getPeople(pagination?: number): Promise<ResponseData> {
    const url = `${process.env.URL}/people`;
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
          results: resultsArray,
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
  async getPersonById(id: string): Promise<Response> {
    const url = `${process.env.URL}/people`;
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
  async getMostCommonPerson(): Promise<Object[]> {
    const peopleUrl = `${process.env.URL}/people`;
    const filmsUrl = `${process.env.URL}/films`;
    let peopleData = await findIndexInDb(peopleUrl, this.cacheModel);
    let filmsData = await findIndexInDb(filmsUrl, this.cacheModel);

    if (!filmsData) {
      filmsData = await fetch(filmsUrl).then((response: Response) =>
        response.json(),
      );
      await saveToDb(
        filmsUrl,
        {
          count: filmsData.count,
          data: filmsData,
        },
        this.cacheModel,
      );
    }

    if (!peopleData) {
      peopleData = await fetch(`${peopleUrl}/?page=1`).then(
        (response: Response) => response.json(),
      );

      let resultsArray = [...peopleData.results];
      let page = 1;
      let count = peopleData.count;

      do {
        page++;
        peopleData = await fetch(`${peopleUrl}/?page=${page}`).then(
          (response: Response) => response.json(),
        );
        resultsArray = [...resultsArray, ...peopleData.results];
      } while (count > page * 10);

      await saveToDb(
        peopleUrl,
        {
          count: count,
          data: resultsArray,
        },
        this.cacheModel,
      );
    }
    const filmsMsg = trimMessage(filmsData);

    let arr: Object[] = [];
    peopleData.data.map((element) => {
      const regex = new RegExp(element.name, 'g');

      const count = (filmsMsg.match(regex) || []).length;
      arr.push({ name: element.name, count: count });
    });
    const maxCount = Math.max(...arr.map((o: any) => o.count));
    const filteredObjects = arr.filter((obj: any) => obj.count === maxCount);

    return filteredObjects;
  }
}
