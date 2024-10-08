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
import { CommentService } from './comment.service';
import { CreateCommentDTO, UpdateCommentDTO } from '../shared/dto/comment/create-comment-dto';

@Controller('comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Res() res,
    @Body() createCommentDTO: CreateCommentDTO,
  ): Promise<Comment> {
    try {
      const comment = await this.commentService.createComment(createCommentDTO);
      return res.json({
        message: 'Comment created successfully',
        comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get()
  async findAll(@Res() res): Promise<Comment[]> {
    try {
      const comments = await this.commentService.findAll();
      return res.json({
        message: 'Comments obtained successfully',
        comments,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':commentID')
  async findbyId(
    @Res() res,
    @Param('commentID') commentID: string,
  ): Promise<Comment> {
    try {
      const comment = await this.commentService.findById(commentID);
      return res.json({
        message: 'Comment obtained successfully',
        comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':commentID')
  async update(
    @Res() res,
    @Param('commentID') commentID: string,
    @Body() updateCommentDTO: UpdateCommentDTO,
  ): Promise<Comment> {
    try {
      const comment = await this.commentService.updateComment(
        commentID,
        updateCommentDTO,
      );
      console.log(comment);
      return res.json({
        message: 'Comment update successfully',
        comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':commentID')
  async delete(
    @Res() res,
    @Param('commentID') userID: string,
  ): Promise<Comment> {
    try {
      const comment = await this.commentService.deleteComment(userID);
      return res.json({
        message: 'Comment removed successfully',
        comment,
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
