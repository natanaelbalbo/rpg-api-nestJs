import { CharactersService } from 'src/service/characters.service';
import { CreateCharacterDto } from 'src/DTOs/create-character.dto';
import { UpdateCharacterDto } from 'src/DTOs/update-character.dto';
export declare class CharactersController {
    private readonly charactersService;
    constructor(charactersService: CharactersService);
    create(createCharacterDto: CreateCharacterDto): Promise<import("../character.schema").Character>;
    findAll(): Promise<import("../character.schema").Character[]>;
    findOne(id: string): Promise<import("../character.schema").Character>;
    update(id: string, updateCharacterDto: UpdateCharacterDto): Promise<import("../character.schema").Character>;
    delete(id: string): Promise<import("../character.schema").Character>;
    generateBackground(id: string): Promise<string>;
    createRandom(level: number): Promise<import("../character.schema").Character>;
    generateAdventure(characterIds: string[]): Promise<string>;
}
