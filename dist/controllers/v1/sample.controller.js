"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleHomeController = void 0;
const sample_service_1 = require("../../services/sample.service");
const sampleHomeController = async (_, res) => {
    res.json({
        data: {
            admins: await (0, sample_service_1.sampleHomeService)()
        }
    });
};
exports.sampleHomeController = sampleHomeController;
