import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CharactersService } from './service/characters.service';
import { CharactersController } from './controller/characters.controller';
import { Character, CharacterSchema } from './character.schema';
import { OpenAiService } from './service/serviceApi';

@Module({
  imports: [MongooseModule.forFeature([{ name: Character.name, schema: CharacterSchema }])],
  controllers: [CharactersController],
  providers: [CharactersService, OpenAiService],
})
export class CharactersModule {}
