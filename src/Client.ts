import { Collection, Client as DiscordClient } from 'discord.js';
import { Service } from 'typedi';
import { BotSettings, BotClient } from './types';
import { Command } from './Command';
import { ActionManager } from './managers/ActionManager';
import { settings as configuration } from './config/config';

@Service()
export class Client extends DiscordClient implements BotClient {
    public settings: BotSettings;

    constructor(private actionManager: ActionManager) {
        super(configuration.clientOptions || {});

        this.settings = configuration;
        this.settings.token = process.env.BOT_TOKEN;
        this.initialize();
        this.login(configuration.token);
    }

    private initialize(): void {
        this.actionManager.initializeCommands(this);
        this.actionManager.initializeEvents(this);
    }

    public get commands(): Collection<string, Command> {
        return this.actionManager.commands;
    }
}
