import { Test, TestingModule } from '@nestjs/testing';
import { MetaadsController } from './metaads.controller';

describe('MetaadsController', () => {
  let controller: MetaadsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MetaadsController],
    }).compile();

    controller = module.get<MetaadsController>(MetaadsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
