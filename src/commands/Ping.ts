import { Message } from 'discord.js';
import { Command } from '../Command';
import { BotClient } from '../types';

export default class Ping extends Command {
    constructor(client: BotClient) {
        super(client, {
            name: 'ping',
            description: 'Pings the bot.',
            category: 'Information',
            usage: `${client.settings.prefix}ping`,
            cooldown: 1000,
            requiredPermissions: ['READ_MESSAGES']
        });
    }

    public async run(message: Message): Promise<void> {
        await super.respond(message.channel, 'Pong!');
    }
}
