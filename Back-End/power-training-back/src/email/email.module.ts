import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { Email } from './providers/emails';

@Module({
  controllers: [EmailController],
  providers: [EmailService, Email]
})
export class EmailModule {}
