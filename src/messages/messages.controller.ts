import {Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res} from '@nestjs/common';
import {CreateMessageDto} from "./dto/create-message-dto";
import {MessageService} from "./services/message.service";

@Controller('messages')
export class MessagesController {

    constructor(private messageService: MessageService) {
    }

    @Post()
    create(@Body() createMessageDto: CreateMessageDto, @Res() response) {
        this.messageService.createMessage(createMessageDto)
            .then((message) => {
                response.status(HttpStatus.CREATED).json(message);
            })
            .catch((error) => {
                response.status(HttpStatus.FORBIDDEN).json(error);
            });
    }

    @Get()
    getAll(@Res() response) {
        this.messageService.getAll()
            .then((messageList) => {
                response.status(HttpStatus.OK).json(messageList);
            }).catch((error) => {
            response.status(HttpStatus.FORBIDDEN).json(error);
        });
    }

    @Put(':id')
    update(@Body() updateMessageDto: CreateMessageDto, @Res() response, @Param('id') id) {
        this.messageService.updateMessage(id, updateMessageDto)
            .then((message) => {
                response.status(HttpStatus.OK).json(message);
            }).catch((error) => {
            response.status(HttpStatus.FORBIDDEN).json(error);
        });
    }

    @Delete(':id')
    delete(@Res() response, @Param('id') id) {
        this.messageService.deleteMessage(id)
            .then((message) => {
                response.status(HttpStatus.OK).json(message);
            }).catch((error) => {
            response.status(HttpStatus.FORBIDDEN).json(error);
        });
    }
}
