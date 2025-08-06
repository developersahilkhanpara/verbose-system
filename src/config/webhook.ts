// src/utils/setupTelegramWebhook.ts
import axios from 'axios'

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`
const WEBHOOK_PATH = '/webhook'

export const setupTelegramWebhook = async () => {
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
}
