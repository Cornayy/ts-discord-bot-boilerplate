import { User, Message, Guild } from 'discord.js';
import { AnyChannel, BotClient, CommandOptions, EmbedOrMessage, UserCooldown } from './types';

export abstract class Command {
    public conf: CommandOptions;
    public cooldowns: Set<UserCooldown>;

    constructor(protected client: BotClient, options: CommandOptions) {
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

    /**
     * Checks if the user has permission to run the command.
     * @param {User} user A Discord user.
     * @param {Message} message The original message that was sent.
     * @returns {boolean} Whether the user can run the command.
     */
    public canRun(user: User, message: Message): boolean {
        const onCooldown =
            [...this.cooldowns].filter(cd => cd.user === user && cd.guild === message.guild)
                .length > 0;
        const hasPermission = message.member
            ? message.member.hasPermission(this.conf.requiredPermissions, {
                  checkAdmin: true,
                  checkOwner: true
              })
            : false;

        if (!hasPermission || onCooldown) {
            message.channel.send(
                'You do not have permission for this command or you are on cooldown.'
            );
            return false;
        }

        return true;
    }

    /**
     * Sets the cooldown on a command for a Discord user.
     * @param {User} user The user that will receive a cooldown.
     * @param {Guild} guild The Discord server where the original message was sent.
     */
    public setCooldown(user: User, guild: Guild): void {
        this.cooldowns.add({ user, guild });

        setTimeout(() => {
            const cooldown = [...this.cooldowns].filter(
                cd => cd.user === user && cd.guild === guild
            )[0];
            this.cooldowns.delete(cooldown);
        }, this.conf.cooldown);
    }

    /**
     * Sends the message in the specified channel.
     * @param {AnyChannel} channel Any Discord channel.
     * @param {EmbedOrMessage} message The message or embed that will be sent.
     * @returns {Promise<Command>} The original command, supports method chaining.
     */
    public async respond(channel: AnyChannel, message: EmbedOrMessage): Promise<Command> {
        await channel.send(message);

        return this;
    }

    /**
     * The abstract run method for every command.
     * @param {Message} message The original message object that triggered the command.
     * @param {string[]} args The arguments that got sent with the message.
     */
    public abstract async run(message: Message, args: string[]): Promise<void>;
}
