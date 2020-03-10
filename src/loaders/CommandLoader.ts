import * as path from 'path';
import { readdir, statSync } from 'fs';
import { Collection } from 'discord.js';
import { IBotClient } from '../types';
import { Logger } from '../utils/Logger';
import { Command } from '../Command';

export const getCommands = (client: IBotClient): Collection<string, Command> => {
    const collection = new Collection<string, Command>();
    const { commands } = client.settings.paths;

    readdir(commands, (err, files) => {
        if (err) Logger.error(err);

        files.forEach(cmd => {
            if (statSync(path.join(commands, cmd)).isDirectory()) {
                getCommands(client);
            } else {
                const Command: any = require(path.join(
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
};
