import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from '../product/product.schema';
import { Document } from 'mongoose';

export type CartDocument = HydratedDocument<Cart>;

@Schema()
export class Cart {
  @Prop()
  product: Product;

  @Prop()
  count: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
