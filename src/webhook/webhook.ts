// src/utils/setupTelegramWebhook.ts
import axios from 'axios'
import { TELEGRAM_API, WEBHOOK_PATH } from '../utils/const'


export const setupTelegramWebhook = async () => {
  const publicUrl = process.env.PUBLIC_URL || process.env.RENDER_EXTERNAL_URL || process.env.RAILWAY_PUBLIC_URL

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
