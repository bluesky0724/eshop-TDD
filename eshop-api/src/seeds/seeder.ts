import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { seed } from 'mongoose-seeder';
import { data } from './seed-data';

@Injectable()
export class Seeder {
  constructor() {
    const uri = process.env.MONGO_URI;
    (async () => {
      mongoose.connect(uri);
      // Seed the database
      await mongoose.connection.dropDatabase();
      await mongoose.connection.collection('products').insertMany(data);
    })();
  }
}
