import { Injectable } from '@nestjs/common';
import { PRODUCTS } from '../mocks/product.mock';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}
  public getProduct(filterText: string): Promise<Array<Product>> {
    return new Promise(async (resolve) => {
      if (!filterText) {
        resolve(await this.productModel.find({}));
        return;
      }

      const products = await this.productModel.find({
        title: { $regex: filterText, $options: 'i' },
      });
      resolve(products);
    });
  }
}
