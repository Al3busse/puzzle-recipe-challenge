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
var Recipe_1 = require("../../entity/Recipe");
var Category_1 = require("../../entity/Category");
exports.default = {
    Query: {
        getRecipes: function (_, __) { return __awaiter(void 0, void 0, void 0, function () {
            var recipes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Recipe_1.Recipe.find({ relations: ["category", "user"] })];
                    case 1:
                        recipes = _a.sent();
                        if (recipes.length != 0) {
                            return [2 /*return*/, recipes];
                        }
                        throw new apollo_server_express_1.UserInputError("There are no Recipes yet.");
                }
            });
        }); },
        getOneRecipe: function (_, _a) {
            var id = _a.id;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Recipe_1.Recipe)
                                .findOne(id, { relations: ["category", "user"] })];
                        case 1:
                            recipe = _b.sent();
                            if (recipe) {
                                return [2 /*return*/, recipe];
                            }
                            throw new apollo_server_express_1.UserInputError("There is no Recipe with this ID");
                    }
                });
            });
        },
        getMyRecipes: function (_, _a) {
            var user = _a.user;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipes;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, Recipe_1.Recipe.find({
                                where: { user: user },
                                relations: ["category", "user"],
                            })];
                        case 1:
                            recipes = _b.sent();
                            if (recipes.length != 0) {
                                return [2 /*return*/, recipes];
                            }
                            throw new apollo_server_express_1.UserInputError("This user dont have any Recipes yet.");
                    }
                });
            });
        },
    },
    Mutation: {
        createRecipe: function (_, 
        // { token }: { token: number },
        _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe, categoryCheck, newRecipe;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Recipe_1.Recipe)
                                .findOne({ where: { name: input.name } })];
                        case 1:
                            recipe = _b.sent();
                            if (recipe) {
                                throw new apollo_server_express_1.UserInputError("There is a Recipe with that name already.");
                            }
                            return [4 /*yield*/, typeorm_1.getRepository(Category_1.Category).findOne(input.category)];
                        case 2:
                            categoryCheck = (_b.sent());
                            if (!categoryCheck) {
                                throw new apollo_server_express_1.UserInputError("Category not found");
                            }
                            newRecipe = new Recipe_1.Recipe();
                            newRecipe.name = input.name;
                            newRecipe.ingredients = input.ingredients;
                            newRecipe.description = input.description;
                            newRecipe.category = categoryCheck;
                            return [4 /*yield*/, typeorm_1.getManager().save(newRecipe)];
                        case 3: 
                        //newRecipe.user = input.user;
                        return [2 /*return*/, _b.sent()];
                    }
                });
            });
        },
        updateRecipe: function (_, _a) {
            var id = _a.id, input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipeToUpdate, categoryCheck, updatedRecipe;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Recipe_1.Recipe)
                                .findOne({ id: id }, { relations: ["category", "user"] })];
                        case 1:
                            recipeToUpdate = _b.sent();
                            if (!!recipeToUpdate) return [3 /*break*/, 2];
                            throw new apollo_server_express_1.UserInputError("There is no Recipe with this ID");
                        case 2: return [4 /*yield*/, typeorm_1.getRepository(Category_1.Category).findOne(input.category)];
                        case 3:
                            categoryCheck = (_b.sent());
                            if (!categoryCheck) {
                                throw new apollo_server_express_1.UserInputError("Category not found");
                            }
                            recipeToUpdate.name = input.name;
                            recipeToUpdate.description = input.description;
                            recipeToUpdate.ingredients = input.ingredients;
                            recipeToUpdate.category = categoryCheck;
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .getRepository(Recipe_1.Recipe)
                                    .save(recipeToUpdate)];
                        case 4:
                            updatedRecipe = _b.sent();
                            return [2 /*return*/, updatedRecipe];
                    }
                });
            });
        },
        deleteRecipe: function (_, _a) {
            var recipeId = _a.recipeId;
            return __awaiter(void 0, void 0, void 0, function () {
                var recipe;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, typeorm_1.getConnection()
                                .getRepository(Recipe_1.Recipe)
                                .findOne(recipeId, { relations: ["category", "user"] })];
                        case 1:
                            recipe = _b.sent();
                            if (!recipe) {
                                throw new apollo_server_express_1.UserInputError("There is no Recipe with this ID");
                            }
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .createQueryBuilder()
                                    .delete()
                                    .from(Recipe_1.Recipe)
                                    .where("id = :id", { id: recipeId })
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
