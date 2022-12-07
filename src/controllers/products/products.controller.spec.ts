import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from 'src/services/products/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of products', () => {
    const result = [
      {
        id: 1,
        name: 'Product 1',
        description: 'Bla bla bla',
        price: 122,
        stock: 100,
        image: '',
      },
    ];
    jest.spyOn(service, 'getAll').mockImplementation(() => result);

    expect(service.getAll()).toBe(result);
  });
});
