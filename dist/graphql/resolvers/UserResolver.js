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
var validation_1 = require("../../utils/validation");
var auth_1 = require("../../utils/auth");
var User_1 = require("../../entity/User");
exports.default = {
    Query: {
        getUsers: function (_) { return __awaiter(void 0, void 0, void 0, function () {
            var users;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, User_1.User.find()];
                    case 1:
                        users = _a.sent();
                        if (users.length != 0) {
                            return [2 /*return*/, users];
                        }
                        throw new apollo_server_express_1.UserInputError("There are no Users yet.");
                }
            });
        }); },
    },
    Mutation: {
        signUp: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var error, userExist, newUser, _b, savedUser;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            error = validation_1.registrationSchema.validate(input).error;
                            if (error)
                                throw new apollo_server_express_1.UserInputError(error.details[0].message);
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .getRepository(User_1.User)
                                    .findOne({
                                    where: { email: input.email },
                                })];
                        case 1:
                            userExist = _c.sent();
                            if (userExist)
                                throw new apollo_server_express_1.UserInputError("Email is already in use.");
                            newUser = new User_1.User();
                            newUser.name = input.name;
                            newUser.email = input.email;
                            _b = newUser;
                            return [4 /*yield*/, auth_1.hashPassword(input.password)];
                        case 2:
                            _b.password = _c.sent();
                            return [4 /*yield*/, typeorm_1.getManager().save(newUser)];
                        case 3:
                            savedUser = _c.sent();
                            return [2 /*return*/, savedUser];
                    }
                });
            });
        },
        logIn: function (_, _a) {
            var input = _a.input;
            return __awaiter(void 0, void 0, void 0, function () {
                var error, userExist, validPassword, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            error = validation_1.loginSchema.validate(input).error;
                            if (error)
                                throw new apollo_server_express_1.UserInputError(error.details[0].message);
                            return [4 /*yield*/, typeorm_1.getConnection()
                                    .getRepository(User_1.User)
                                    .findOne({
                                    where: { email: input.email },
                                })];
                        case 1:
                            userExist = _b.sent();
                            if (!userExist)
                                throw new apollo_server_express_1.UserInputError("Wrong email or password.");
                            return [4 /*yield*/, auth_1.validatePassword(input.password, userExist.password)];
                        case 2:
                            validPassword = _b.sent();
                            if (!validPassword)
                                throw new apollo_server_express_1.UserInputError("Wrong email or password.");
                            token = auth_1.getToken(userExist.id);
                            return [2 /*return*/, { token: token }];
                    }
                });
            });
        },
    },
};
