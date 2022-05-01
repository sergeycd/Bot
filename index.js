const TelegramApi = require('node-telegram-bot-api');
const { gameOptions, againgameOptions } = require('./options');
const token = '5306594314:AAFgN-fNrr0tf1zKY_5kLLArRZ-ELDG2qBI';

const bot = new TelegramApi(token, { polling: true });
//  бд
const chat = {};

const startGame = async (chatid) => {
  await bot.sendMessage(
    chatid,
    'Сейчас я загадаю число от 0 до 9 а ты постарайся его отгадать'
  );
  const randomNumber = Math.floor(Math.random() * 10);
  chat[chatid] = randomNumber;
  await bot.sendMessage(chatid, 'Отгадывай', gameOptions);
};

// команды для меню
bot.setMyCommands([
  { command: '/start', description: 'Начально приветствие' },
  { command: '/info', description: 'Немного магии' },
  { command: '/game', description: 'Сыграем?)' },
]);

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatid = msg.chat.id;
  if (text === '/start') {
    await bot.sendSticker(
      chatid,
      'https://cdn.tlgrm.app/stickers/92a/b72/92ab72b3-29fe-3f53-acd7-8eabd1037ab6/192/1.webp'
    );
    return bot.sendMessage(
      chatid,
      'Привет! Это демо бот, если тебе интересно, как сделать такой же или ты хочешь задать другие вопросы, напиши мне в телеграмм по адресу-@cdpctr'
    );
  }
  if (text === '/info') {
    return bot.sendMessage(
      chatid,
      `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`
    );
  }
  if (text === '/game') {
    return startGame(chatid);
  }
  return bot.sendMessage(chatid, 'я тебя не понимаю, попробуй еще раз!');
});

bot.on('callback_query', async (msg) => {
  const data = msg.data;
  const chatid = msg.message.chat.id;
  if (data === '/again') {
    return startGame(chatid);
  }
  if (data === chat[chatid]) {
    return bot.sendMessage(
      chatid,
      `Поздравляю, ты отгадал цифру ${chat[chatid]}`,
      againgameOptions
    );
  } else {
    return bot.sendMessage(
      chatid,
      `К сожалению, ты не отгадал, бот загадал цифру ${chat[chatid]}`,
      againgameOptions
    );
  }

  bot.sendMessage(chatid, `ты выбрал цифру ${data}`);
});

// const start = () => {}
