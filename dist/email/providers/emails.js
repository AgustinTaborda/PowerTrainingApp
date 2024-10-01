"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
const common_1 = require("@nestjs/common");
const nodemailer = require("nodemailer");
let Email = class Email {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
    }
    async sendEmail(from, subjectEmail, sendTo, html) {
        try {
            const info = await this.transporter.sendMail({
                from: from,
                to: sendTo,
                subject: subjectEmail,
                html: html,
            });
            console.log("Message sent: %s", info.messageId);
        }
        catch (error) {
            throw error;
        }
    }
};
exports.Email = Email;
exports.Email = Email = __decorate([
    (0, common_1.Injectable)()
], Email);
//# sourceMappingURL=emails.js.map