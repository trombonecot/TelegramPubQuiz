
import Scene from 'telegraf/scenes/base';
import WizardScene from 'telegraf/scenes/wizard';
import Markup from 'telegraf/markup';
import db from '../../bd';
import { getQuestion } from '../../wikidata';

export function askWizard() {
    let question;
    let score = 0;

    const addWizard = new WizardScene('ask-wizard',
        async (ctx) => {
            question = await getQuestion();
            ctx.reply(question.question, Markup.keyboard(question.possible).extra());
            return ctx.wizard.next();
        },
        (ctx) => {
            const resposta = ctx.message.text;
            let resultat;

            if (resposta === question.answer ) {
                resultat = 'Good answer';
                score++;
                //db.insert(score);
            } else {
                resultat = 'Bad answer';
                //db.insert(score);
            }
            ctx.reply(resultat, Markup.removeKeyboard().extra());

            return ctx.scene.leave()
        }
    );

    return addWizard;
}


export function ask( ctx ) {
    ctx.scene.enter('ask-wizard');
}
