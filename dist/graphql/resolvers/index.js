"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var UserResolver_1 = __importDefault(require("./UserResolver"));
var CategoryResolver_1 = __importDefault(require("./CategoryResolver"));
var RecipeResolver_1 = __importDefault(require("./RecipeResolver"));
exports.default = [UserResolver_1.default, CategoryResolver_1.default, RecipeResolver_1.default];
