import {
  Body,
  Controller,
  Post,
  Res,
  HttpStatus,
  UseGuards,
  Get,
  UseFilters,
  Param,
} from '@nestjs/common';
import { Response } from 'express';

import { CategoryService } from './category.service';
import { GQLRolesGuard } from 'src/guard/gql-role.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/decorator/role.entity';
import { ErrorExceptionFilter } from 'src/filter/auth-exception.filter';

@Controller('category')
@UseFilters(new ErrorExceptionFilter())
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

  @Get(':id/subcategories') // Use :id as a route parameter
  @Roles(UserRole.ADMIN, UserRole.CLIENT)
  @UseGuards(GQLRolesGuard)
  async subcategories(
    @Param('id') id: number,
    @Res() res: Response,
  ) {
    try {
      const subcategories =
        await this.categoryService.findSubCategoriesById(id);

      return res.status(HttpStatus.OK).json({ subcategories });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      });
    }
  }
}
