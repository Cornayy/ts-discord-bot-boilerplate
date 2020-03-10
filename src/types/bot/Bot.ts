import {
    Client,
    TextChannel,
    DMChannel,
    GroupDMChannel,
    GuildMember,
    PermissionString,
    PresenceData,
    ClientOptions,
    RichEmbed,
    Guild,
    User,
    Collection
} from 'discord.js';
import { Command } from '../../Command';

export interface IBotClient extends Client {
    settings: ISettings;
    commands: Collection<string, Command>;
    userHasPermission(user: GuildMember, requiredPermissions: PermissionString[]): boolean;
}

export interface ICommandOptions {
    name: string;
    description?: string;
    usage?: string;
    category?: string;
    cooldown: number;
    requiredPermissions: PermissionString[];
}

export interface ISettings {
    presence: PresenceData;
    clientOptions?: ClientOptions;
    token?: string;
    prefix: string;
    paths: {
        commands: string;
        events: string;
    };
}

export interface IEvent {
    client: IBotClient;
    run(args?: any[]): void;
}

export interface IUserCooldown {
    user: User;
    guild: Guild;
}

export type AnyChannel = TextChannel | DMChannel | GroupDMChannel;
export type EmbedOrMessage = RichEmbed | string;
