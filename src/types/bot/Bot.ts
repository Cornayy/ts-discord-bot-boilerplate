import {
    Client,
    TextChannel,
    DMChannel,
    PermissionString,
    PresenceData,
    ClientOptions,
    MessageEmbed,
    Guild,
    User,
    Collection,
    NewsChannel
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
    run(args?: any[]): void;
}

export interface UserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | NewsChannel;
export type EmbedOrMessage = MessageEmbed | string;
