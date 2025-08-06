import express , { Request , Response} from 'express'
import 'dotenv/config'
import DBConnect from './database/db';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 8000;

//accept params
app.use(express.urlencoded())
//accept json data
app.use(express.json())

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const WEBHOOK_PATH = '/webhook'

app.post(WEBHOOK_PATH, async (req, res) => {
  const message = req.body.message

  if (!message) return res.sendStatus(200)

  const chatId = message.chat.id
  const text = message.text

  if (text === '/start') {
    await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: `👋 Welcome! You've started the bot.`,
    })
  }

  res.sendStatus(200)
})

DBConnect().then(() => {
  app.listen(port, async () => {
  console.log(`Server running at http://localhost:${port}`);

  const publicUrl =
    process.env.PUBLIC_URL ||
    process.env.RENDER_EXTERNAL_URL ||
    process.env.RAILWAY_PUBLIC_URL

  if (!publicUrl) {
    console.warn('⚠️ PUBLIC_URL is not set. Skipping webhook setup.')
    return
  }

  const webhookUrl = `${publicUrl}${WEBHOOK_PATH}`

  try {
    const res = await axios.get(`${TELEGRAM_API}/setWebhook`, {
      params: { url: webhookUrl },
    })
    console.log('✅ Webhook set to:', webhookUrl)
  } catch (err) {
    console.error('❌ Failed to set webhook:', err)
  }
});
}).catch(error => {
  console.log(error)
})