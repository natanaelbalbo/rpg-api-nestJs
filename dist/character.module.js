"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharactersModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const characters_service_1 = require("./service/characters.service");
const characters_controller_1 = require("./controller/characters.controller");
const character_schema_1 = require("./character.schema");
const serviceApi_1 = require("./service/serviceApi");
let CharactersModule = class CharactersModule {
};
exports.CharactersModule = CharactersModule;
exports.CharactersModule = CharactersModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: character_schema_1.Character.name, schema: character_schema_1.CharacterSchema }])],
        controllers: [characters_controller_1.CharactersController],
        providers: [characters_service_1.CharactersService, serviceApi_1.GeminiService],
    })
], CharactersModule);
//# sourceMappingURL=character.module.js.map