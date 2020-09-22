import { Collection, Client as DiscordClient } from 'discord.js';
import { loadEvents } from './managers/EventLoader';
import { getCommands } from './managers/CommandLoader';
import { BotSettings, BotClient } from './types';
import { Command } from './Command';

export class Client extends DiscordClient implements BotClient {
    public settings: BotSettings;
    public commands: Collection<string, Command>;

    public constructor(settings: BotSettings) {
        super(settings.clientOptions || {});

        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;

        this.commands = getCommands(this);
        loadEvents(this);

        this.login(settings.token);
    }
}
