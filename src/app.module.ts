import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';  
import { AuthModule } from './auth.module';
import { UsersModule } from './users.module';
import { CharactersModule } from './character.module';
import { LoggingMiddleware } from './logging.middleware';
import { OpenAiService } from './service/serviceApi';  

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/rpg-app'),
    AuthModule,
    UsersModule,
    CharactersModule,  
  ],
  providers: [OpenAiService],  
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}