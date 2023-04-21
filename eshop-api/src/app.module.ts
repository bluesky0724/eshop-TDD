import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seeds/seed.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ProductModule,
    CartModule,
    SeedModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
