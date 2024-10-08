import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateSubCategoryDTO,
  UpdateSubCategoryDTO,
} from '../shared/dto/subcatagory/create-subcategory.dto';
import { SubCategory } from '../shared/interfaces/subcatagory/subcategory.interface';

@Injectable()
export class SubcategoryService {
  constructor(
    @InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>,
  ) {}

  async findAll(): Promise<SubCategory[]> {
    try {
      return await this.subCategoryModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryModel.findById(id);

      if (!subCategory) {
        throw new HttpException(
          'Sub category not found',
          HttpStatus.NO_CONTENT,
        );
      }

      return subCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createSubCategory(
    createSubCategoryDTO: CreateSubCategoryDTO,
  ): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryModel.create(
        createSubCategoryDTO,
      );
      return await subCategory.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateSubCategory(
    subCategoryID: string,
    updateSubCategoryDTO: UpdateSubCategoryDTO,
  ): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryModel.findByIdAndUpdate(
        subCategoryID,
        updateSubCategoryDTO,
        { new: true },
      );

      return subCategory;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteSubCategory(subCategoryID: string): Promise<SubCategory> {
    try {
      const subCategory = await this.subCategoryModel.findByIdAndUpdate(
        subCategoryID,
        { state: false },
      );

      return subCategory;
    } catch (error) {
      throw new Error(error);
    }
  }
}
