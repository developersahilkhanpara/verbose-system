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
exports.app = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const db_1 = __importDefault(require("./database/db"));
const axios_1 = require("./config/axios");
const const_1 = require("./utils/const");
const webhook_1 = require("./webhook/webhook");
const helper_1 = require("./utils/helper");
exports.app = (0, express_1.default)();
const port = process.env.PORT || 8000;
//accept params
exports.app.use(express_1.default.urlencoded());
//accept json data
exports.app.use(express_1.default.json());
exports.app.post(const_1.WEBHOOK_PATH, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const message = req.body.message;
    if (!message)
        return res.sendStatus(200);
    const chatId = message.chat.id;
    const text = message.text;
    if (text === '/start') {
        yield axios_1.telegramApi.post('sendMessage', {
            chat_id: chatId,
            text: `👋 Welcome! You've started the bot.`,
        });
    }
    res.sendStatus(200);
}));
(0, db_1.default)().then(() => {
    exports.app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`Server running at http://localhost:${port}`);
        console.log((0, helper_1.getStableInstanceId)());
        console.log((0, helper_1.getSystemInfo)());
        (0, webhook_1.setupTelegramWebhook)().then(() => {
            console.log("seted webhook");
        }).catch(error => {
            console.log("webhook error", error);
        });
    }));
}).catch(error => {
    console.log(error);
});
//# sourceMappingURL=index.js.map