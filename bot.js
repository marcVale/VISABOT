const { chromium } = require('playwright');
const axios = require('axios');
require('dotenv').config();

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    await page.goto('https://visasbot.com/', { waitUntil: 'networkidle' });

    const content = await page.content();
    if (content.includes('Available')) {
      const message = '🚨 Visa Slot Found! Visit https://visasbot.com/';
      await axios.post(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: message,
      });
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await browser.close();
  }
})();
