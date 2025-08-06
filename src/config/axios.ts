import axios from 'axios'
import { getEnv } from './env'

const TELEGRAM_TOKEN = getEnv('TELEGRAM_BOT_TOKEN')

// Create Axios instance with Telegram API base URL
export const telegramApi = axios.create({
  baseURL: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optional: add logging or error interceptors if needed
telegramApi.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error('❌ Telegram API error:', err?.response?.data || err.message)
    return Promise.reject(err)
  }
)
