import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  ClassSerializerInterceptor, UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles, RolesGuard } from '../auth/role.guard';
import Role from '../user/entities/role.enum';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('product')
@UseInterceptors(ClassSerializerInterceptor)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @Roles(Role.Admin, Role.Customer)
  @UseGuards(JwtAuthGuard, RolesGuard)
   findAll() {
    return this.productService.findAll();
  }


  @Put(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    await this.productService.update(+id, updateProductDto);
    return this.productService.findOne(+id);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
   remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
