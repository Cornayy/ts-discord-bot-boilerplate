import {
    Client,
    TextChannel,
    DMChannel,
    GroupDMChannel,
    PermissionString,
    PresenceData,
    ClientOptions,
    RichEmbed,
    Guild,
    User,
    Collection
} from 'discord.js';
import { Command } from '../../Command';

export interface BotClient extends Client {
    settings: BotSettings;
    commands: Collection<string, Command>;
}

export interface CommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: PermissionString[];
}

export interface BotSettings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}

export interface BotEvent {
    client: BotClient;
    run(args?: any[]): void;
}

export interface UserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;
export type EmbedOrMessage = RichEmbed | string;
