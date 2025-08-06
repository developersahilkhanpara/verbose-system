import express , { Request , Response} from 'express'
import 'dotenv/config'
import DBConnect from './database/db';
import axios from 'axios';
import { telegramApi } from './config/axios';

const app = express();
const port = process.env.PORT || 8000;

//accept params
app.use(express.urlencoded())
//accept json data
app.use(express.json())

const WEBHOOK_PATH = '/webhook'
app.post(WEBHOOK_PATH, async (req, res) => {
  const message = req.body.message

  if (!message) return res.sendStatus(200)

  const chatId = message.chat.id
  const text = message.text

  if (text === '/start') {
    await telegramApi.post('sendMessage',{
      chat_id: chatId,
      text: `👋 Welcome! You've started the bot.`,
    })
  }

  res.sendStatus(200)
})

DBConnect().then(() => {
  app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);
});
}).catch(error => {
  console.log(error)
})