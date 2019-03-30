import Bot from './bot/Bot';
import config from './config.json';

const bot = new Bot(config.token);

bot.configure();

bot.start();
