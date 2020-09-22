import { Client } from '../Client';
import { Logger } from '../utils/Logger';
import { BotEvent } from '../types';

export default class Ready implements BotEvent {
    public client: Client;

    constructor(client: Client) {
        this.client = client;
    }

    public async run(): Promise<void> {
        Logger.info(`${this.client.user.username} is running.`);
        this.client.user.setPresence(this.client.settings.presence);
    }
}
