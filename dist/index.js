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
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("./database/db"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//accept params
app.use(express_1.default.urlencoded());
//accept json data
app.use(express_1.default.json());
const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const WEBHOOK_PATH = '/webhook';
app.post(WEBHOOK_PATH, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    if (!message)
        return res.sendStatus(200);
    const chatId = message.chat.id;
    const text = message.text;
    if (text === '/start') {
        yield axios_1.default.post(`${TELEGRAM_API}/sendMessage`, {
            chat_id: chatId,
            text: `👋 Welcome! You've started the bot.`,
        });
    }
    res.sendStatus(200);
}));
(0, db_1.default)().then(() => {
    app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server running at http://localhost:${port}`);
        const publicUrl = process.env.PUBLIC_URL ||
            process.env.RENDER_EXTERNAL_URL ||
            process.env.RAILWAY_PUBLIC_URL;
        if (!publicUrl) {
            console.warn('⚠️ PUBLIC_URL is not set. Skipping webhook setup.');
            return;
        }
        const webhookUrl = `${publicUrl}${WEBHOOK_PATH}`;
        try {
            const res = yield axios_1.default.get(`${TELEGRAM_API}/setWebhook`, {
                params: { url: webhookUrl },
            });
            console.log('✅ Webhook set to:', webhookUrl);
        }
        catch (err) {
            console.error('❌ Failed to set webhook:', err);
        }
    }));
}).catch(error => {
    console.log(error);
});
//# sourceMappingURL=index.js.map