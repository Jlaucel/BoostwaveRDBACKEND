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
const users_service_1 = require("./users.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const company_service_1 = require("../company/company.service");
let UsersController = class UsersController {
    usersService;
    companyService;
    constructor(usersService, companyService) {
        this.usersService = usersService;
        this.companyService = companyService;
    }
    async register(body) {
        const company = await this.companyService.findOne(body.companyId);
        if (!company) {
            throw new common_1.BadRequestException('La empresa no existe');
        }
        const existingUser = await this.usersService.findUserByUsername(body.username);
        if (existingUser)
            return { msg: 'User already exists' };
        await this.usersService.createUser(body.username, body.password, body.email, String(body.companyId), body.accessToken, body.firstName, body.lastName, body.phone, body.profilePictureUrl);
        return { message: 'User registered successfully' };
    }
    async getUser(req) {
        const username = req.user?.username;
        if (!username)
            return { msg: 'No user in token' };
        const user = await this.usersService.findUserByUsername(username);
        if (!user)
            return { msg: 'User not found' + username };
        const { password, ...result } = user;
        return result;
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('getUser'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        company_service_1.CompanyService])
], UsersController);
//# sourceMappingURL=users.controller.js.map