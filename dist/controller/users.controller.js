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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../service/users.service");
const create_user_dto_1 = require("../DTOs/create-user.dto");
const user_not_found_exception_1 = require("../exceptions/user-not-found.exception");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async create(createUserDto) {
        try {
            return await this.usersService.create(createUserDto);
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.HttpException('User already exists', common_1.HttpStatus.CONFLICT);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async findAll() {
        return this.usersService.findAll();
    }
    async findById(id) {
        try {
            return await this.usersService.findById(id);
        }
        catch (error) {
            if (error instanceof user_not_found_exception_1.UserNotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(id, updateUserDto) {
        try {
            return await this.usersService.update(id, updateUserDto);
        }
        catch (error) {
            if (error instanceof user_not_found_exception_1.UserNotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async remove(id) {
        try {
            return await this.usersService.remove(id);
        }
        catch (error) {
            if (error instanceof user_not_found_exception_1.UserNotFoundException) {
                throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
            }
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findById", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map