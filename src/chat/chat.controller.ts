import { Controller, Get, Param, Patch } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('history/:userId')
  async getChatHistory(@Param('userId') userId: string) {
    return this.chatService.getChatHistory(userId);
  }

  @Get('new-message-status/:adminId')
  async getNewMessageStatus(@Param('adminId') adminId: string) {
    return this.chatService.getNewMessageStatus(adminId);
  }

  @Patch('mark-as-read/:userId')
  async markMessagesAsRead(@Param('userId') userId: string) {
    const admin = await this.chatService.getAdminUser();
    return this.chatService.markMessagesAsRead(userId, admin.id);
  }
}
