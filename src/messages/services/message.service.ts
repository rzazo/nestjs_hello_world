import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Message} from "../entities/message.entity";
import {Repository} from "typeorm";
import {CreateMessageDto} from "../dto/create-message-dto";

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private readonly messageRepository: Repository<Message>
    ) {
    }

    async getAll(): Promise<Message[]> {
        return await this.messageRepository.find();
    }

    async createMessage(message: CreateMessageDto): Promise<Message> {
        const newMessage = new Message();
        newMessage.message = message.message;
        newMessage.nick = message.nick;

        return await this.messageRepository.save(newMessage);
    }

    async updateMessage(id: number, messageToUpdate: CreateMessageDto): Promise<Message> {
        const messageUpdate = await this.messageRepository.findOne(id);
        messageUpdate.nick = messageToUpdate.nick;
        messageUpdate.message = messageToUpdate.message;

        return await this.messageRepository.save(messageUpdate);
    }

    async deleteMessage(id: number): Promise<any> {
        return await this.messageRepository.delete(id);
    }
}
