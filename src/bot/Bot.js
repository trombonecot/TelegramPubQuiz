import Telegraf from 'telegraf';
import { options } from './options';
import Stage from 'telegraf/stage';
import session  from 'telegraf/session';

import { askWizard } from './actions/index';

export default class Bot {
    constructor(token) {
        this.bot = new Telegraf(token);
    }

    configure() {
        const stage = new Stage([askWizard()], { ttl: 10 });

        this.bot.use(session())
        this.bot.use(stage.middleware())
        this.bot.start((ctx) => ctx.reply('Trivial questions!'));

        this.bot.help((ctx) => ctx.reply(this.getHelpMessage()));

        for (let i = 0, len = options.length; i < len; i++) {
            const option = options[i];

            if ( option.type === 'on' ) {
                this.bot.on(option.name, (ctx) => option.action(ctx));
            } else if ( option.type === 'command' ) {
                this.bot.command(option.name, option.action );
            } else {
                this.bot.hears(option.name, (ctx) => option.action(ctx));
            }
        }   

        this.bot.action("good", (ctx) => ctx.editMessageText('Good one!'));
        this.bot.action("bad", (ctx) => ctx.editMessageText('Bad one!'));
    }

    getHelpMessage() {
        let heplMessage = "";
        
        for (let i = 0, len = options.length; i < len; i++) {
            let option = options[i];
            heplMessage += `${option.name}: ${option.description}\n`;
        }

        return heplMessage;
    }

    start() {
        this.bot.startPolling();
    }
}