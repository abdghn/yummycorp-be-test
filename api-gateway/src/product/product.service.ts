import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_SERVICE') private readonly clientProductService: ClientProxy,
  ) {}
  create(createProductDto: CreateProductDto) {
    return this.clientProductService.send({cmd: "createProduct"},createProductDto);

  }

  findAll() {
    return this.clientProductService.send({cmd: "findAllProduct"},{});
  }

  findOne(id: number) {
    return this.clientProductService.send({cmd: "findOneProduct"},id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    updateProductDto.id = id
    return this.clientProductService.send({cmd: "updateProduct"}, updateProductDto);
  }

  remove(id: number) {
    return this.clientProductService.send({cmd: 'removeProduct'}, id);
  }
}
