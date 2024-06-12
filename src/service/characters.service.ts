import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Character, CharacterDocument } from 'src/character.schema';
import { CreateCharacterDto } from 'src/DTOs/create-character.dto';
import { UpdateCharacterDto } from 'src/DTOs/update-character.dto';
import { GeminiService } from './serviceApi';

@Injectable()
export class CharactersService {
  constructor(
    @InjectModel(Character.name) private characterModel: Model<CharacterDocument>,
    private readonly geminiService: GeminiService
  ) {}

  async create(createCharacterDto: CreateCharacterDto): Promise<Character> {
    const createdCharacter = new this.characterModel(createCharacterDto);
    return createdCharacter.save();
  }

  async findAll(): Promise<Character[]> {
    return this.characterModel.find().exec();
  }

  async findOne(id: string): Promise<Character> {
    return this.characterModel.findById(id).exec();
  }

  async update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character> {
    return this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true }).exec();
  }

  async remove(id: string): Promise<Character> {
    return this.characterModel.findByIdAndDelete(id).exec();
  }

  async findAllByIds(ids: string[]): Promise<Character[]> {
    const objectIds = ids.map(id => new Types.ObjectId(id));
    return this.characterModel.find({ _id: { $in: objectIds } }).exec();
  }

  async createRandomCharacter(level: number): Promise<Character> {
    const randomName = `RandomName${Math.floor(Math.random() * 1000)}`;
    const classes = ['warrior', 'wizard', 'cleric'];
    const randomClass = classes[Math.floor(Math.random() * classes.length)];
    const attributes = {
      strength: Math.floor(Math.random() * 10) + 1,
      dexterity: Math.floor(Math.random() * 10) + 1,
      constitution: Math.floor(Math.random() * 10) + 1,
      intelligence: Math.floor(Math.random() * 10) + 1,
      wisdom: Math.floor(Math.random() * 10) + 1,
      charisma: Math.floor(Math.random() * 10) + 1,
    };

    const character = new this.characterModel({
      name: randomName,
      class: randomClass,
      level: level,
      attributes: attributes,
      feats: [],
      alignment: 'neutral',
      skills: [],
      spells: [],
      items: [],
    });

    return character.save();
  }

  async generateCharacterBackground(characterId: string): Promise<string> {
    const character = await this.findOne(characterId);
    if (!character) {
      throw new Error('Character not found');
    }
    return this.geminiService.generateCharacterBackground(character);
  }

  async generateAdventure(characterIds: string[]): Promise<string> {
    if (!characterIds || characterIds.length < 3) {
      throw new Error('A aventura requer pelo menos 3 personagens.');
    }
    const characters = await this.findAllByIds(characterIds);
    if (!characters || characters.length < 3) {
      throw new Error('A aventura requer pelo menos 3 personagens.');
    }
    const characterDetails = characters.map(char => ({
      name: char.name,
      class: char.class,
      level: char.level,
      attributes: char.attributes,
    }));
    return this.geminiService.generateAdventure(characterDetails);
  }
}
