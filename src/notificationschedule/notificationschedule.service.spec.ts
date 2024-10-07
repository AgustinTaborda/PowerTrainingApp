import { Test, TestingModule } from '@nestjs/testing';
import { NotificationscheduleService } from './notificationschedule.service';

describe('NotificationscheduleService', () => {
  let service: NotificationscheduleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NotificationscheduleService],
    }).compile();

    service = module.get<NotificationscheduleService>(NotificationscheduleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
