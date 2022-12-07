// To create a service use the commad nest g s <folder-name>/<service-name>
// If you add the flag --flat the file will not be created in a folder inside the directory of the previous comand
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dtos/products.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Bla bla bla',
      price: 122,
      stock: 100,
      image: '',
    },
  ];

  getAll() {
    return this.products;
  }

  getOneById(id: number) {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  create(payload: CreateProductDto) {
    this.counterId += 1;
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.getOneById(id);
    if (!product) {
      throw new HttpException('Product does not exist', HttpStatus.NOT_FOUND);
    }
    const index = this.products.findIndex((item) => item.id === id);
    this.products[index] = { ...product, ...payload };
    return this.products[index];
  }

  delete(id: number) {
    const productsArrayLength = this.products.length;
    this.products = this.products.filter((item) => item.id !== id);
    if (productsArrayLength === this.products.length) {
      throw new HttpException(
        'There is no product assigned to that Id',
        HttpStatus.BAD_REQUEST,
      );
    }
    return { message: `product with Id: ${id} was removed` };
  }
}
