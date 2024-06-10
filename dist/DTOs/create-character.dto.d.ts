declare class Attributes {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
}
export declare class CreateCharacterDto {
    name: string;
    class: string;
    level: number;
    attributes: Attributes;
    feats?: string[];
    alignment?: string;
    talents?: string[];
    spells?: string[];
    items?: string[];
}
export {};
