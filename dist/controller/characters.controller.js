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
exports.CharactersController = void 0;
const common_1 = require("@nestjs/common");
const characters_service_1 = require("../service/characters.service");
const jwt_auth_guard_1 = require("../jwt-auth.guard");
const create_character_dto_1 = require("../DTOs/create-character.dto");
const update_character_dto_1 = require("../DTOs/update-character.dto");
let CharactersController = class CharactersController {
    constructor(charactersService) {
        this.charactersService = charactersService;
    }
    async create(createCharacterDto) {
        return this.charactersService.create(createCharacterDto);
    }
    async findAll() {
        return this.charactersService.findAll();
    }
    async findOne(id) {
        return this.charactersService.findOne(id);
    }
    async update(id, updateCharacterDto) {
        return this.charactersService.update(id, updateCharacterDto);
    }
    async delete(id) {
        return this.charactersService.remove(id);
    }
    async generateBackground(id) {
        return this.charactersService.generateCharacterBackground(id);
    }
    async createRandom(level) {
        return this.charactersService.createRandomCharacter(level);
    }
    async generateAdventure(characterIds) {
        return this.charactersService.generateAdventure(characterIds);
    }
};
exports.CharactersController = CharactersController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_character_dto_1.CreateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_character_dto_1.UpdateCharacterDto]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "delete", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generate-background/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "generateBackground", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('random'),
    __param(0, (0, common_1.Body)('level')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "createRandom", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('generate-adventure'),
    __param(0, (0, common_1.Body)('characterIds')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CharactersController.prototype, "generateAdventure", null);
exports.CharactersController = CharactersController = __decorate([
    (0, common_1.Controller)('characters'),
    __metadata("design:paramtypes", [characters_service_1.CharactersService])
], CharactersController);
//# sourceMappingURL=characters.controller.js.map