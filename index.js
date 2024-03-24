require('dotenv').config();

const {
    Bot,
    GrammyError,
    HttpError,
} = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);

// КОМАНДЫ БОТА

bot.command('start', async (ctx) => {
    await ctx.reply("I am a simplest bot ever! I show your <b>ID</b> in Telegram", {
        parse_mode: "HTML"
    }, )
});

bot.command('id', async (ctx) => {
    await ctx.reply(`Your ID: <pre>${ctx.from.id}</pre>`, {
        parse_mode: "HTML"
    });
});

bot.command('about', async (ctx) => {
    await ctx.reply(`It's just a simple stupid bot that shows your ID in Telegram. Developer: @pavstyuk`, {
        parse_mode: "HTML"
    });
});

// МЕНЮ БОТА

bot.api.setMyCommands([{
        command: "start",
        description: "Run me"
    },
    {
        command: "id",
        description: "Show my id"
    },
    {
        command: "about",
        description: "Much more information"
    }
])

bot.hears(['id', 'ID', 'Id'], async (ctx) => {
    await ctx.reply(`You ID: <pre>${ctx.from.id}</pre>`, {
        parse_mode: "HTML"
    });
});

bot.on(["message:text", "message:file", "message:media"], async (ctx) => {
    await ctx.reply(`${ctx.message.from.first_name}, just ID and nothing else.`, {
        parse_mode: "HTML"
    });
});


// ОБРАБОТЧИК ОШИБОК 
bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Ошибка при обработке обновления ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
        console.error("Ошибка в запросе:", e.description);
    } else if (e instanceof HttpError) {
        console.error("Не удалось связаться с Telegram:", e);
    } else {
        console.error("Неизвестная ошибка:", e);
    }
});


bot.start();