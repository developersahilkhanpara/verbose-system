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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupTelegramWebhook = void 0;
// src/utils/setupTelegramWebhook.ts
const axios_1 = __importDefault(require("axios"));
const const_1 = require("../utils/const");
const setupTelegramWebhook = () => __awaiter(void 0, void 0, void 0, function* () {
    const publicUrl = process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || process.env.RAILWAY_PUBLIC_URL;
    if (!publicUrl) {
        console.warn('⚠️ PUBLIC_URL is not set. Skipping webhook setup.');
        return;
    }
    const webhookUrl = `${publicUrl}${const_1.WEBHOOK_PATH}`;
    try {
        const res = yield axios_1.default.get(`${const_1.TELEGRAM_API}/setWebhook`, {
            params: { url: webhookUrl },
        });
        console.log('✅ Webhook set to:', webhookUrl);
    }
    catch (err) {
        console.error('❌ Failed to set webhook:', err);
    }
});
exports.setupTelegramWebhook = setupTelegramWebhook;
//# sourceMappingURL=webhook.js.map