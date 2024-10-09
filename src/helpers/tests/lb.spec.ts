import { Test, TestingModule } from '@nestjs/testing';
import { DateManager } from '../datemanager'

describe('DateManager', () => {
  let service: DateManager;

  // Configuración del módulo de prueba
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateManager],
    }).compile();

    service = module.get<DateManager>(DateManager);
  });

  // Caso de prueba: Verifica que el servicio esté definido
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Caso de prueba: Verifica el valor devuelto por getValue
  it('should return ********0909', () => {
    //expect(service.getValue()).toBe('Hello, World!');
    expect(service.encodeToHourSchedule(9,9)).toBe('********0909');
  });
  it('should return ********2010', () => {
    //expect(service.getValue()).toBe('Hello, World!');
    expect(service.encodeToHourSchedule(20,10)).toBe('********2010');
  });
  it('should return ********0010', () => {
    //expect(service.getValue()).toBe('Hello, World!');
    expect(service.encodeToHourSchedule(0,10)).toBe('********0010');
  });
  it('should return ********0000', () => {
    //expect(service.getValue()).toBe('Hello, World!');
    expect(service.encodeToHourSchedule(0,0)).toBe('********0000');
  });
  it('should return Max hours to 23 and minutes to 59 and no negative numbers', () => {
    //expect(service.getValue()).toBe('Hello, World!');
    expect(() => service.encodeToHourSchedule(24,10)).toThrow('Max hours to 23 and minutes to 59 and no negative numbers');
  });
});

// ejecutar así que lo encuentra  "npm run test lb.spec.ts"

