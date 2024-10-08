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
import { CategoryService } from './category.service';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../shared/dto/catagory/create-category.dto';
import { Category } from '../shared/interfaces/catagory/category.interface';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Res() res,
    @Body() createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    try {
      const category = await this.categoryService.createCategory(
        createCategoryDTO,
      );
      return res.json({
        message: 'Category created successfully',
        category,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Category[]> {
    try {
      const category = await this.categoryService.findAll();
      return res.json({
        message: 'Categories obtained successfully',
        category,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':categoryID')
  async findById(
    @Res() res,
    @Param('categoryID') categoryID: string,
  ): Promise<Category> {
    try {
      const category = await this.categoryService.findById(categoryID);
      return res.json({
        message: 'Category obtained successfully',
        category,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':categoryID')
  async update(
    @Res() res,
    @Param('categoryID') categoryID: string,
    @Body() updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    try {
      const category = await this.categoryService.updateCategory(
        categoryID,
        updateCategoryDTO,
      );
      return res.json({
        message: 'Category update successfully',
        category,
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':categoryID')
  async delete(
    @Res() res,
    @Param('categoryID') categoryID: string,
  ): Promise<Category> {
    try {
      const category = await this.categoryService.deleteCategory(categoryID);
      return res.json({
        message: 'Category removed successfully',
        category,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
