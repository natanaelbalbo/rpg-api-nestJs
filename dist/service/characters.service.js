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
const character_schema_1 = require("../schema/character.schema");
let CharactersService = class CharactersService {
    constructor(characterModel) {
        this.characterModel = characterModel;
    }
    async create(createCharacterDto) {
        const createdCharacter = new this.characterModel(createCharacterDto);
        return createdCharacter.save();
    }
    async findAll() {
        return this.characterModel.find().exec();
    }
    async findOne(id) {
        const character = await this.characterModel.findById(id).exec();
        if (!character) {
            throw new common_1.NotFoundException(`Character #${id} not found`);
        }
        return character;
    }
    async update(id, updateCharacterDto) {
        const existingCharacter = await this.characterModel
            .findByIdAndUpdate(id, updateCharacterDto, { new: true })
            .exec();
        if (!existingCharacter) {
            throw new common_1.NotFoundException(`Character #${id} not found`);
        }
        return existingCharacter;
    }
    async remove(id) {
        const deletedCharacter = await this.characterModel.findByIdAndDelete(id).exec();
        if (!deletedCharacter) {
            throw new common_1.NotFoundException(`Character #${id} not found`);
        }
        return deletedCharacter;
    }
};
exports.CharactersService = CharactersService;
exports.CharactersService = CharactersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(character_schema_1.Character.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CharactersService);
//# sourceMappingURL=characters.service.js.map