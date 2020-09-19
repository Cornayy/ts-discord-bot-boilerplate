import { User, Message, Guild } from 'discord.js';
import { AnyChannel, IBotClient, ICommandOptions, EmbedOrMessage, IUserCooldown } from './types';

export abstract class Command {
    protected client: IBotClient;
    public conf: ICommandOptions;
    public cooldowns: Set<IUserCooldown>;

    constructor(client: IBotClient, options: ICommandOptions) {
        this.client = client;

        this.conf = {
            name: options.name,
            description: options.description || 'No information specified.',
            usage: options.usage || '',
            category: options.category || 'Information',
            cooldown: options.cooldown || 1000,
            requiredPermissions: options.requiredPermissions || ['READ_MESSAGES']
        };

        this.cooldowns = new Set();
    }

    public hasPermission(user: User, message: Message): boolean {
        if (
            !this.client.userHasPermission(message.member, this.conf.requiredPermissions) ||
            [...this.cooldowns].filter(cd => cd.user === user && cd.guild === message.guild)
                .length > 0
        ) {
            message.channel.send(
                "You don't have permission for this command or you are on cooldown."
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
