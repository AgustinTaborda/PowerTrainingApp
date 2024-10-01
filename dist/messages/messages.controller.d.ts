import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    create(createMessageDto: CreateMessageDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateMessageDto: UpdateMessageDto): string;
    remove(id: string): string;
}
