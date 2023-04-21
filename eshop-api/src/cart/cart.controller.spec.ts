import { Test, TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';

import { data } from '../seeds/seed-data';
import mongoose from 'mongoose';
import { ProductService } from '../product/product.service';
import { Product, ProductSchema } from '../product/product.schema';
import { HttpException } from '@nestjs/common';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/test'),
        MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      controllers: [CartController],
      providers: [CartService, ProductService],
    }).compile();
    const uri = 'mongodb://localhost:27017/test';
    await mongoose.connect(uri);
    await mongoose.connection.dropDatabase();
    await mongoose.connection.collection('products').insertMany(data);

    controller = module.get<CartController>(CartController);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return error for not registered productId', async () => {
    try {
      await controller.addCartItem({ productId: '7' });
    } catch (err) {
      console.log(JSON.stringify(err));
      expect(err.response.status).toBe(400);
    }
  });

  it('should return 1 cart item after adding first item', async () => {
    const cartItems = await controller.addCartItem({ productId: '1' });
    console.log('cartItem: ', cartItems);
    expect(cartItems.length).toBe(1);
  });

  it('should return 1 item but count increased after adding same product to cart', async () => {
    // Adding prduct 1
    await controller.addCartItem({ productId: '1' });

    // Adding Product 1 again
    const cartItems = await controller.addCartItem({ productId: '1' });
    expect(cartItems.length).toBe(1);
    expect(cartItems[0].count).toBe(2);
  });

  it('should return 2 items after adding two different products', async () => {
    // Adding prduct 2
    await controller.addCartItem({ productId: '1' });

    // Adding Product 2
    const cartItems = await controller.addCartItem({ productId: '2' });
    expect(cartItems.length).toBe(2);
    expect(cartItems[0].count).toBe(1);
    expect(cartItems[1].count).toBe(1);
  });

  it('should return 1 item after adding 1 product', async () => {
    // Adding prduct 1
    await controller.addCartItem({ productId: '1' });

    // Reading cart items.
    const cartItems = await controller.getCartItems();
    expect(cartItems.length).toBe(1);
  });

  it('should return zero items after clearing cart items', async () => {
    // Adding prduct 1
    await controller.addCartItem({ productId: '1' });

    // Adding product 2
    await controller.addCartItem({ productId: '2' });

    const cartItems = await controller.getCartItems();
    expect(cartItems.length).toBe(2);

    // Clearing cart
    await controller.clearCartItem();

    const newCartItems = await controller.getCartItems();
    expect(newCartItems.length).toBe(0);
  });
});
