"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBHOOK_PATH = exports.TELEGRAM_API = exports.TELEGRAM_TOKEN = void 0;
exports.TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
exports.TELEGRAM_API = `https://api.telegram.org/bot${exports.TELEGRAM_TOKEN}`;
exports.WEBHOOK_PATH = '/webhook';
//# sourceMappingURL=const.js.map