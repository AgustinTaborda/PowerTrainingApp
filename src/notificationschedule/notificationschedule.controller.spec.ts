import { Test, TestingModule } from '@nestjs/testing';
import { NotificationscheduleController } from './notificationschedule.controller';
import { NotificationscheduleService } from './notificationschedule.service';

describe('NotificationscheduleController', () => {
  let controller: NotificationscheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NotificationscheduleController],
      providers: [NotificationscheduleService],
    }).compile();

    controller = module.get<NotificationscheduleController>(NotificationscheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
