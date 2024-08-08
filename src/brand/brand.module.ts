import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SharedModule } from 'src/shared/shared.module';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { BrandSchema } from '../shared/schemas/brand/brand.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Brand', schema: BrandSchema }]),
    SharedModule,
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}
