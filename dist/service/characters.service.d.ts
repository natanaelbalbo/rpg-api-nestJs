/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model } from 'mongoose';
import { Character, CharacterDocument } from 'src/schema/character.schema';
import { CreateCharacterDto } from 'src/DTOs/create-character.dto';
import { UpdateCharacterDto } from 'src/DTOs/update-character.dto';
export declare class CharactersService {
    private characterModel;
    constructor(characterModel: Model<CharacterDocument>);
    create(createCharacterDto: CreateCharacterDto): Promise<Character>;
    findAll(): Promise<Character[]>;
    findOne(id: string): Promise<Character>;
    update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<Character>;
    remove(id: string): Promise<Character>;
}
