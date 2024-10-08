import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCommentDTO, UpdateCommentDTO } from '../shared/dto/comment/create-comment-dto';
import { Comment } from '../shared/interfaces/comment/comment.interface';

@Injectable()
export class CommentService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) {}

  async findAll(): Promise<Comment[]> {
    try {
      return await this.commentModel.find();
    } catch (error) {
      throw new Error(error);
    }
  }

  async findById(id: string): Promise<Comment> {
    try {
      const comment = await this.commentModel.findById(id);
      if (!comment) {
        throw new HttpException('Comment not found', HttpStatus.NO_CONTENT);
      }
      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async createComment(createCommentDTO: CreateCommentDTO): Promise<Comment> {
    try {
      const comment = await this.commentModel.create(createCommentDTO);
      return await comment.save();
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateComment(
    commentID: string,
    updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(
        commentID,
        updateCommentDTO,
        { new: true },
      );

      console.log({ comment });

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteComment(userID: string): Promise<Comment> {
    try {
      const comment = await this.commentModel.findByIdAndUpdate(userID, {
        state: false,
      });

      return comment;
    } catch (error) {
      throw new Error(error);
    }
  }
}
