"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var apollo_server_express_1 = require("apollo-server-express");
var Category_1 = require("../../entity/Category");
var auth_1 = require("../../utils/auth");
exports.default = {
    Query: {
        getCategories: function (_, __, context) { return __awaiter(void 0, void 0, void 0, function () {
            var categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, auth_1.authUser(context.tokenBearer)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, Category_1.Category.find({ relations: ["recipes"] })];
                    case 2:
                        categories = _a.sent();
                        if (categories.length != 0) {
                            return [2 /*return*/, categories];
                        }
                        throw new apollo_server_express_1.UserInputError("There are no Categories yet.");
                }
            });
        }); },
        getOneCategory: function (_, _a) {
            var categoryId = _a.categoryId;
            return __awaiter(void 0, void 0, void 0, function () {
                var category;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Category_1.Category)
                                .findOne(categoryId, { relations: ["recipes"] })];
                        case 1:
                            category = _b.sent();
                            if (category) {
                                return [2 /*return*/, category];
                            }
                            throw new apollo_server_express_1.UserInputError("There is no Category with this ID");
                    }
                });
            });
        },
    },
    Mutation: {
        createCategory: function (_, _a) {
            var name = _a.name;
            return __awaiter(void 0, void 0, void 0, function () {
                var category, newCategory;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Category_1.Category)
                                .findOne({ where: { name: name } })];
                        case 1:
                            category = _b.sent();
                            if (category) {
                                throw new apollo_server_express_1.UserInputError("There is a Category with that name already.");
                            }
                            newCategory = new Category_1.Category();
                            newCategory.name = name;
                            return [2 /*return*/, typeorm_1.getManager().save(newCategory)];
                    }
                });
            });
        },
        updateCategory: function (_, _a) {
            var categoryId = _a.categoryId, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var categoryToUpdate, updatedCategory;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Category_1.Category)
                                .findOne(categoryId, { relations: ["recipes"] })];
                        case 1:
                            categoryToUpdate = _b.sent();
                            if (!!categoryToUpdate) return [3 /*break*/, 2];
                            throw new apollo_server_express_1.UserInputError("There is no Category with this ID");
                        case 2:
                            categoryToUpdate.name = input.name;
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .getRepository(Category_1.Category)
                                    .save(categoryToUpdate)];
                        case 3:
                            updatedCategory = _b.sent();
                            return [2 /*return*/, updatedCategory];
                    }
                });
            });
        },
        deleteCategory: function (_, _a) {
            var categoryId = _a.categoryId;
            return __awaiter(void 0, void 0, void 0, function () {
                var category;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Category_1.Category)
                                .findOne(categoryId, { relations: ["recipes"] })];
                        case 1:
                            category = _b.sent();
                            if (!category) {
                                throw new apollo_server_express_1.UserInputError("There is no Category with this ID");
                            }
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .createQueryBuilder()
                                    .delete()
                                    .from(Category_1.Category)
                                    .where("id = :id", { id: categoryId })
                                    .execute()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, true];
                    }
                });
            });
        },
    },
};
