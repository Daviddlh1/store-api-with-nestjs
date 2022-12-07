// To create a controller use the commad nest g co <folder-name>/<service-name>
// If you add the flag --flat the file will not be created in a folder inside the directory of the previous comand
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../../dtos/products.dto';

// import { Request, Response } from 'express';
import { ProductsService } from 'src/services/products/products.service';
// import { ParseIntPipe } from 'src/shared/parse-int/parse-int.pipe';

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  // Using the queries of the request
  // @Get()
  // getProducts(
  //   @Query('limit') limit = 100,
  //   @Query('offset') offset = 0,
  //   @Query('brand') brand: string,
  // ) {
  //   return this.productService.getAll();
  // }

  @Get()
  getProducts() {
    return this.productService.getAll();
  }

  @Get('filter')
  productFilter() {
    return `I am a filter`;
  }

  // Using express to manage the request and the response
  // @Get(':id')
  // @HttpCode(HttpStatus.OK)
  // getProductById(@Req() request: Request, @Res() response: Response) {
  //   console.log(request.params);
  //   response.status(200).send({
  //     messag: `product ${request.params.id}`,
  //   });
  // }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  getProductById(@Param('id', ParseIntPipe) id: number) {
    return this.productService.getOneById(+id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.productService.delete(id);
  }
}
