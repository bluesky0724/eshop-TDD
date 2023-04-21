import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  async getCartItems() {
    return await this.cartService.getCartItems();
  }

  @Post()
  async addCartItem(@Body() { productId }: { productId: string }) {
    return await this.cartService.addCartItem(productId);
  }

  @Delete()
  async deleteCartItem(@Body() { productId }: { productId: string }) {
    return await this.cartService.deleteCartItem(productId);
  }

  @Delete('/all')
  async clearCartItem() {
    await this.cartService.clearCart();
    return {
      msg: 'success',
    };
  }
}
