import { Collection, Client as DiscordClient } from 'discord.js';
import { BotSettings, BotClient } from './types';
import { Command } from './Command';
import { ActionManager } from './managers/ActionManager';

export class Client extends DiscordClient implements BotClient {
    private actionManager: ActionManager;
    public settings: BotSettings;

    public constructor(settings: BotSettings) {
        super(settings.clientOptions || {});

        this.actionManager = new ActionManager(this);
        this.settings = settings;
        this.settings.token = process.env.BOT_TOKEN;
        this.login(settings.token);
    }

    public get commands(): Collection<string, Command> {
        return this.actionManager.commands;
    }
}
