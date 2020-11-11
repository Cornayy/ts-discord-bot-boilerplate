import { Collection, Client as DiscordClient } from 'discord.js';
import { Service } from 'typedi';
import { Logger } from './utils/Logger';
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
    }

    private async initialize(): Promise<void> {
        try {
            await this.login(configuration.token);
            this.actionManager.initializeCommands(this);
            this.actionManager.initializeEvents(this);
        } catch (e) {
            Logger.error(`Could not initialize bot: ${e}`);
        }
    }

    public get commands(): Collection<string, Command> {
        return this.actionManager.commands;
    }
}
