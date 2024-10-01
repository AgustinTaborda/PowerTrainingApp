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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const emails_1 = require("./providers/emails");
let EmailService = class EmailService {
    constructor(emailProvider) {
        this.emailProvider = emailProvider;
    }
    async sendEmail(body) {
        try {
            const { from, subjectEmail, sendTo } = body;
            const html = this.getTemplate(body);
            await this.emailProvider.sendEmail(from, subjectEmail, sendTo, html);
        }
        catch (error) {
            throw error;
        }
    }
    getTemplate(body) {
        const template = this.getTemplateFile(body.template);
        const html = template.fillTemplate(body);
        return html;
    }
    getTemplateFile(template) {
        const path = './templates';
        const templateFile = require(`${path}/${template}`);
        return templateFile;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [emails_1.Email])
], EmailService);
//# sourceMappingURL=email.service.js.map