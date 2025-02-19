"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sample_router_1 = __importDefault(require("./sample.router"));
const routes = express_1.default.Router();
routes.use('/sample', sample_router_1.default);
exports.default = routes;
