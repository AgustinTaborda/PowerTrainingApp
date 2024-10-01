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
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationEntity = exports.ProcessedState = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
var ProcessedState;
(function (ProcessedState) {
    ProcessedState["NOT_PROCESSED"] = "NOT_PROCESSED";
    ProcessedState["PROCESSED"] = "PROCESSED";
    ProcessedState["PROCESSING"] = "PROCESSING";
})(ProcessedState || (exports.ProcessedState = ProcessedState = {}));
let NotificationEntity = class NotificationEntity {
    constructor() {
        this.messageId = (0, uuid_1.v4)();
        this.userId = (0, uuid_1.v4)();
    }
};
exports.NotificationEntity = NotificationEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "processedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "messageId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ProcessedState,
        default: ProcessedState.NOT_PROCESSED
    }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "processedState", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], NotificationEntity.prototype, "queuedDate", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "methodToSend", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], NotificationEntity.prototype, "userId", void 0);
exports.NotificationEntity = NotificationEntity = __decorate([
    (0, typeorm_1.Entity)('notifications')
], NotificationEntity);
//# sourceMappingURL=notification.entity.js.map