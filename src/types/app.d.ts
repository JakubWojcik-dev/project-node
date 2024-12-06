import { Document } from 'mongoose';

export interface Cache extends Document {
  readonly url: string;
  readonly createdAt: Date;
  readonly data: any[];
}
export interface ResponseData {
  count: number;
  data: any[];
}
