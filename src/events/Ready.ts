import { Client } from '../Client';
import { Logger } from '../utils/Logger';
import { BotEvent } from '../types';

export default class Ready implements BotEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    async run(): Promise<void> {
        Logger.info('Bot is running.');
        this.client.user.setPresence(this.client.settings.presence);
    }
}
