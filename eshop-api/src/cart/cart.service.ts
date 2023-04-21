import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PRODUCTS } from '../mocks/product.mock';
import { CartItem } from '../utils/types';
import { InjectModel } from '@nestjs/mongoose';
import { Cart } from './cart.schema';
import { Model } from 'mongoose';
import { Product } from '../product/product.schema';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  @Inject(ProductService)
  private readonly productService: ProductService;

  cartItems: Array<CartItem> = [];

  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  getCartItems(): Promise<Array<CartItem>> {
    return new Promise(async (resolve) => {
      const cartItems = await this.cartModel.find();
      resolve(cartItems);
    });
  }

  async addCartItem(productId: string): Promise<Array<CartItem>> {
    const cartItem = await this.cartModel.findOne({
      'product.id': productId,
    });

    if (cartItem) {
      await this.cartModel.findOneAndUpdate(
        {
          'product.id': productId,
        },
        { $inc: { count: 1 } },
      );
    } else {
      const products = await this.productService.getProduct('');
      try {
        const product = products.find((item) => item.id === productId);
        if (!product)
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              errors: {
                message: `productId ${productId} is not found`,
              },
            },
            HttpStatus.BAD_REQUEST,
          );
        const newCart = new this.cartModel({ product: product, count: 1 });
        await newCart.save();
      } catch {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: {
              message: `productId ${productId} is not found`,
            },
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    // let flag = false;
    // this.cartItems = this.cartItems.map((cartItem) => {
    //   if (cartItem.product.id === productId) {
    //     cartItem.count++;
    //     flag = true;
    //   }
    //   return cartItem;
    // });
    // if (!flag) {
    //   try {
    //     const product = PRODUCTS.find((item) => item.id === productId);
    //     if (!product) reject('product id not found');
    //     this.cartItems.push({ product, count: 1 });
    //     const newCart = new this.cartModel({ product: product, count: '1' });
    //     await newCart.save();
    //   } catch {
    //     reject('product id not found');
    //   }
    // }
    const cartItems = await this.cartModel.find();
    // console.log('cart items are: ', cartItems);
    return cartItems;
  }

  deleteCartItem(productID: string): Promise<Array<CartItem>> {
    return new Promise(async (resolve) => {
      this.cartModel.deleteOne({ id: productID });
      const cartItems = await this.cartModel.find();
      resolve(this.cartItems);
    });
  }

  async clearCart() {
    await this.cartModel.deleteMany({});
  }
}
