import { User, Message, Guild } from 'discord.js';
import { AnyChannel, BotClient, CommandOptions, EmbedOrMessage, UserCooldown } from './types';

export abstract class Command {
    protected client: BotClient;
    public conf: CommandOptions;
    public cooldowns: Set<UserCooldown>;

    constructor(client: BotClient, options: CommandOptions) {
        this.client = client;
        this.conf = {
            name: options.name,
            description: options.description || 'No information specified.',
            usage: options.usage || 'No usage specified.',
            category: options.category || 'Information',
            cooldown: options.cooldown || 1000,
            requiredPermissions: options.requiredPermissions || ['READ_MESSAGES']
        };
        this.cooldowns = new Set();
    }

    public canRun(user: User, message: Message): boolean {
        const onCooldown =
            [...this.cooldowns].filter(cd => cd.user === user && cd.guild === message.guild)
                .length > 0;
        const hasPermission = message.member.hasPermission(
            this.conf.requiredPermissions,
            false,
            true,
            true
        );

        if (!hasPermission || onCooldown) {
            message.channel.send(
                'You do not have permission for this command or you are on cooldown.'
            );
            return false;
        }
        return true;
    }

    public setCooldown(user: User, guild: Guild): void {
        this.cooldowns.add({ user, guild });

        setTimeout(() => {
            const cooldown = [...this.cooldowns].filter(
                cd => cd.user === user && cd.guild === guild
            )[0];
            this.cooldowns.delete(cooldown);
        }, this.conf.cooldown);
    }

    public async respond(channel: AnyChannel, message: EmbedOrMessage): Promise<Command> {
        await channel.send(message);

        return this;
    }

    public abstract async run(message: Message, args: string[]): Promise<void>;
}
