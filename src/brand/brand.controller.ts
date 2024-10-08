import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BrandService } from './brand.service';
import { CreateBrandDTO, UpdateBrandDTO } from '../shared/dto/brand/create-brand.dto';
import { Brand } from '../shared/interfaces/brand/brand.interface';

@UseGuards(JwtAuthGuard)
@Controller('brand')
export class BrandController {
  constructor(private brandService: BrandService) {}

  @Post()
  async create(
    @Res() res,
    @Body() createBrandDTO: CreateBrandDTO,
  ): Promise<Brand> {
    try {
      const brand = await this.brandService.createBrand(createBrandDTO);
      return res.json({
        message: 'Brand created successfully',
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Brand[]> {
    try {
      const brand = await this.brandService.findAll();
      return res.json({
        message: 'Brand obtained successfully',
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':brandID')
  async findById(
    @Res() res,
    @Param('brandID') brandID: string,
  ): Promise<Brand> {
    try {
      const brand = await this.brandService.findById(brandID);
      return res.json({
        message: 'Brand obtained successfully',
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':brandID')
  async update(
    @Res() res,
    @Param('brandID') brandID: string,
    @Body() updateBrandDTO: UpdateBrandDTO,
  ): Promise<Brand> {
    try {
      const brand = await this.brandService.updateBrand(
        brandID,
        updateBrandDTO,
      );
      return res.json({
        message: 'Brand update successfully',
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':brandID')
  async delete(@Res() res, @Param('brandID') brandID: string): Promise<Brand> {
    try {
      const brand = await this.brandService.deleteBrand(brandID);
      return res.json({
        message: 'Brand removed successfully',
        brand,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
