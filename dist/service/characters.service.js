"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const character_schema_1 = require("../character.schema");
const serviceApi_1 = require("./serviceApi");
let CharactersService = class CharactersService {
    constructor(characterModel, geminiService) {
        this.characterModel = characterModel;
        this.geminiService = geminiService;
    }
    async create(createCharacterDto) {
        const createdCharacter = new this.characterModel(createCharacterDto);
        return createdCharacter.save();
    }
    async findAll() {
        return this.characterModel.find().exec();
    }
    async findOne(id) {
        return this.characterModel.findById(id).exec();
    }
    async update(id, updateCharacterDto) {
        return this.characterModel.findByIdAndUpdate(id, updateCharacterDto, { new: true }).exec();
    }
    async remove(id) {
        return this.characterModel.findByIdAndDelete(id).exec();
    }
    async findAllByIds(ids) {
        const objectIds = ids.map(id => new mongoose_2.Types.ObjectId(id));
        return this.characterModel.find({ _id: { $in: objectIds } }).exec();
    }
    async createRandomCharacter(level) {
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
    async generateCharacterBackground(characterId) {
        const character = await this.findOne(characterId);
        if (!character) {
            throw new Error('Character not found');
        }
        return this.geminiService.generateCharacterBackground(character);
    }
    async generateAdventure(characterIds) {
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
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(character_schema_1.Character.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        serviceApi_1.GeminiService])
], CharactersService);
//# sourceMappingURL=characters.service.js.map