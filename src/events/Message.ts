/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Message as DiscordMessage } from 'discord.js';
import { Client } from '../Client';
import { BotEvent } from '../types';

export default class Message implements BotEvent {
    constructor(private client: Client) {}

    public async run(args: any): Promise<void> {
        const message: DiscordMessage = args;

        if (message.author.bot || !message.content.startsWith(this.client.settings.prefix)) return;

        const argus = message.content.split(/\s+/g);
        const command = argus.shift()!.slice(this.client.settings.prefix.length);
        const cmd = this.client.commands.get(command);

        if (!cmd) return;
        if (!cmd.canRun(message.author, message)) return;

        await cmd.run(message, argus);

        if (message.guild) cmd.setCooldown(message.author, message.guild);
    }
}
