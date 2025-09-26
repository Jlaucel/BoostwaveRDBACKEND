import { Test, TestingModule } from '@nestjs/testing';
import { MetaadsService } from './metaads.service';

describe('MetaadsService', () => {
  let service: MetaadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MetaadsService],
    }).compile();

    service = module.get<MetaadsService>(MetaadsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
