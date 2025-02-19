"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleHomeService = void 0;
const db_1 = __importDefault(require("../config/db"));
const sampleHomeService = async () => {
    return await db_1.default.admins.findMany({
        select: {
            name: true,
            email: true,
            created_at: true,
        }
    });
};
exports.sampleHomeService = sampleHomeService;
