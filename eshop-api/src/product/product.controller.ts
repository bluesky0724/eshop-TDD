import { Controller, Get, Query } from '@nestjs/common';
import { Product } from 'src/utils/types';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async getProducts(@Query() query): Promise<Array<Product>> {
    return await this.productService.getProduct(query.filter);
  }
}
