import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Cache extends Document {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true, type: Object })
  data: any;

  @Prop({ default: Date.now, expires: '24h' })
  createdAt: Date;
}

export const CacheSchema = SchemaFactory.createForClass(Cache);
