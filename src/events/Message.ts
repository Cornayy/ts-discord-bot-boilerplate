/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as Discord from 'discord.js';
import { Client } from '../Client';
import { IEvent } from '../types';
import { Logger } from '../utils/Logger';

export default class Message implements IEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(args: any): Promise<void> {
        const message: Discord.Message = args;

        if (message.author.bot || !message.content.startsWith(this.client.settings.prefix)) return;

        const argus = message.content.split(/\s+/g);
        const command = argus.shift()!.slice(this.client.settings.prefix.length);
        const cmd = this.client.commands.get(command);

        if (!cmd) return;
        if (!cmd.hasPermission(message.author, message)) return;

        try {
            await cmd.run(message, argus);
            cmd.setCooldown(message.author, message.guild);
        } catch (e) {
            Logger.warn(e);
        }
    }
}
