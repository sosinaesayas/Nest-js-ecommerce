import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../shared/dto/catagory/create-category.dto';
import { Category } from '../shared/interfaces/catagory/category.interface';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findById(id);

      if (!category) {
        throw new HttpException('Category not found', HttpStatus.NO_CONTENT);
      }

      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createCategory(
    createCategoryDTO: CreateCategoryDTO,
  ): Promise<Category> {
    try {
      const category = await this.categoryModel.create(createCategoryDTO);
      return await category.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCategory(
    categoryID: string,
    updateCategoryDTO: UpdateCategoryDTO,
  ): Promise<Category> {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(
        categoryID,
        updateCategoryDTO,
        { new: true },
      );

      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCategory(categoryID: string): Promise<Category> {
    try {
      const category = await this.categoryModel.findByIdAndUpdate(categoryID, {
        state: false,
      });

      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
}
