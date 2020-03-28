import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesController} from "./messages/messages.controller";
import {MessageService} from './messages/services/message.service';
import {Message} from "./messages/entities/message.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "mysql",
            "host": "localhost",
            "port": 3306,
            "username": "nestjs",
            "password": "nestjs",
            "database": "nestjs_poc",
            "entities": [
                "dist/**/*.entity{.ts,.js}"
            ],
            "synchronize": true
        }),
        TypeOrmModule.forFeature([Message]),
    ],
    controllers: [
        AppController,
        MessagesController,
    ],
    providers: [
        AppService,
        MessageService,
    ],
})
export class AppModule {
}
