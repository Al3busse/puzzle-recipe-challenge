"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registrationSchema = void 0;
var joi_1 = __importDefault(require("joi"));
exports.registrationSchema = joi_1.default.object({
    name: joi_1.default.string().min(6).required(),
    email: joi_1.default.string().min(6).email().required(),
    password: joi_1.default.string().min(6).required(),
});
exports.loginSchema = joi_1.default.object({
    email: joi_1.default.string().min(6).email().required(),
    password: joi_1.default.string().min(6).required(),
});
