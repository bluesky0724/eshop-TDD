import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { data } from '../seeds/seed-data';
import mongoose from 'mongoose';

describe('ProductController', () => {
  let controller: ProductController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    const uri = 'mongodb://localhost:27017/test';
    await mongoose.connect(uri);

    await mongoose.connection.dropDatabase();
    await mongoose.connection.collection('products').insertMany(data);

    controller = module.get<ProductController>(ProductController);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('return all items with no filter', async () => {
    const products = await controller.getProducts({ filter: '' });
    expect(products.length).toBe(6);
  });

  it('return 3 items with filter orange', async () => {
    const products = await controller.getProducts({ filter: 'orange' });

    expect(products.length).toBe(1);
  });
});
