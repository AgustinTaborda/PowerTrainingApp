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
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const google_jwtauth_guard_1 = require("../guards/google-jwtauth.guard");
const roles_guard_1 = require("../guards/roles.guard");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async seedUsers() {
        try {
            await this.usersService.seedUsers();
        }
        catch (error) {
            console.log(error);
            throw new common_1.BadRequestException('Error al cargar usuarios.');
        }
        return { message: 'Usuarios cargados correctamente.' };
    }
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }
    logout(res) {
        const auth0LogoutUrl = `https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.POST_LOGOUT_REDIRECT_URI}`;
        return res.redirect(auth0LogoutUrl);
    }
    findAll(limit = 5, page = 1) {
        return this.usersService.findAll(limit, page);
    }
    findAllByFilters(name, lastname, birthday, role, email, page = 1, limit = 10) {
        if (!name && !lastname && !birthday && !role && !email) {
            throw new common_1.BadRequestException('At least one filter must be provided, example /users/byFilters?name=John&email=john@example.com&page=2&limit=5');
        }
        return this.usersService.findAllByFilters({ name, lastname, birthday, role, email }, page, limit);
    }
    findOne(id) {
        return this.usersService.findOne(id);
    }
    update(id, updateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }
    remove(id) {
        return this.usersService.remove(id);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('/seed'),
    (0, swagger_1.ApiOperation)({ summary: 'Seed users' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "seedUsers", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard, roles_guard_1.RolesGuard),
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({
        name: 'limit',
        required: false,
        example: 5,
        description: 'Limite de items por página',
    }),
    (0, swagger_1.ApiQuery)({
        name: 'page',
        required: false,
        example: 1,
        description: 'Número de página',
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all users' }),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Get)('/byFilters'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve all users that match with criteria, name,lastname,birthday,role,email, example: users/byFilters?email=myemail@mail.com&name=jhon&role=true',
    }),
    (0, swagger_1.ApiQuery)({ name: 'name', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'lastname', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'birthday', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'role', required: false, type: Boolean }),
    (0, swagger_1.ApiQuery)({ name: 'email', required: false, type: String }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: Number }),
    (0, swagger_1.ApiQuery)({ name: 'limit', required: false, type: Number }),
    __param(0, (0, common_1.Query)('name')),
    __param(1, (0, common_1.Query)('lastname')),
    __param(2, (0, common_1.Query)('birthday')),
    __param(3, (0, common_1.Query)('role')),
    __param(4, (0, common_1.Query)('email')),
    __param(5, (0, common_1.Query)('page')),
    __param(6, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, Number, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "findAllByFilters", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Retrieve an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param, and body, see example value below',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.UseGuards)(google_jwtauth_guard_1.CombinedAuthGuard),
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({
        summary: 'Delete an specific user by id (UUID), example: 06b715e7-8b21-4398-a610-940e473f95e9 in param',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "remove", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map