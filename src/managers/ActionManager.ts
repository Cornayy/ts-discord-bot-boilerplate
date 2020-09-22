import { Collection } from 'discord.js';
import { join } from 'path';
import { readdir, statSync } from 'fs';
import { BotClient } from '../types/bot/Bot';
import { Command } from '../Command';
import { Logger } from '../utils/Logger';

export class ActionManager {
    public commands: Collection<string, Command>;

    constructor(client: BotClient) {
        this.commands = this.initializeCommands(client);
        this.initializeEvents(client);
    }

    /**
     * Parses files into commands from the configured command path.
     * @param {BotClient} client The original client, for access to the configuration.
     * @returns {Collection<string, Command>} A dictionary of every command in a [name, object] pair.
     */
    private initializeCommands(client: BotClient): Collection<string, Command> {
        const collection = new Collection<string, Command>();
        const { commands } = client.settings.paths;

        readdir(commands, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(cmd => {
                if (statSync(join(commands, cmd)).isDirectory()) {
                    this.initializeCommands(client);
                } else {
                    const Command: any = require(join(
                        __dirname,
                        '../../',
                        `${commands}/${cmd.replace('ts', 'js')}`
                    )).default;
                    const command = new Command(client);

                    collection.set(command.conf.name, command);
                }
            });
        });

        return collection;
    }

    /**
     * Initializes every event from the configured event path.
     * @param {BotClient} client The original client, for access to the configuration.
     */
    private initializeEvents(client: BotClient): void {
        const { events } = client.settings.paths;

        readdir(events, (err, files) => {
            if (err) Logger.error(err);

            files.forEach(evt => {
                const Event: any = require(join(
                    __dirname,
                    '../../',
                    `${events}/${evt.replace('ts', 'js')}`
                )).default;

                const event = new Event(client);
                const eventName = evt.split('.')[0];

                client.on(
                    eventName.charAt(0).toLowerCase() + eventName.slice(1),
                    (...args: string[]) => event.run(...args)
                );
            });
        });
    }
}
