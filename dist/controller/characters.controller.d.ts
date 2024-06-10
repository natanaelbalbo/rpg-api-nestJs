import { CharactersService } from 'src/service/characters.service';
import { OpenAiService } from 'src/service/serviceApi';
export declare class CharactersController {
    private readonly charactersService;
    private readonly openAiService;
    constructor(charactersService: CharactersService, openAiService: OpenAiService);
    create(createCharacterDto: any): Promise<import("../schema/character.schema").Character>;
    findAll(): Promise<import("../schema/character.schema").Character[]>;
    findOne(id: string): Promise<import("../schema/character.schema").Character>;
    update(id: string, updateCharacterDto: any): Promise<import("../schema/character.schema").Character>;
    delete(id: string): Promise<import("../schema/character.schema").Character>;
    generateBackground(character: any): Promise<string>;
}
