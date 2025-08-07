"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.telegramApi = void 0;
const axios_1 = __importDefault(require("axios"));
const env_1 = require("./env");
const TELEGRAM_TOKEN = (0, env_1.getEnv)('TELEGRAM_BOT_TOKEN');
// Create Axios instance with Telegram API base URL
exports.telegramApi = axios_1.default.create({
    baseURL: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`,
    headers: {
        'Content-Type': 'application/json',
    },
});
// Optional: add logging or error interceptors if needed
exports.telegramApi.interceptors.response.use((res) => res, (err) => {
    var _a;
    console.error('❌ Telegram API error:', ((_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message);
    return Promise.reject(err);
});
//# sourceMappingURL=axios.js.map