import { BotSettings } from '../types/bot/bot';

export const settings: BotSettings = {
    presence: {
        activity: {
            name: '!help for commands',
            type: 'PLAYING'
        }
    },
    prefix: '!',
    paths: {
        commands: 'src/commands',
        events: 'src/events'
    }
};
