import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Response } from 'express';

import { CategoryService } from './category.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('all')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async all_categories(@Res() res: Response) {
    try {
      const categories = await this.categoryService.findAll();

      return res.status(HttpStatus.OK).json({ categories });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }

  @Get(':id/all')
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async subcategories(
    @Body()
    body: {
      id: number;
    },
    @Res() res: Response,
  ) {
    try {
      const subcategories = await this.categoryService.findSubCategoriesById(
        body.id,
      );

      return res.status(HttpStatus.OK).json({ subcategories });
    } catch (error) {
      console.log('🚀 ~ CategoryController ~ subcategories ~ error:', error);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
