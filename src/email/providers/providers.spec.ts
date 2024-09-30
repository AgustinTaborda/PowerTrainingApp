import { Test, TestingModule } from '@nestjs/testing';
import { Providers } from './emails';

describe('Providers', () => {
  let provider: Providers;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Providers],
    }).compile();

    provider = module.get<Providers>(Providers);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
