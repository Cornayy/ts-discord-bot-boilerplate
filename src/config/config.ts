import { BotSettings } from '../types/bot/Bot';

export const settings: BotSettings = {
    presence: {
        game: {
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
