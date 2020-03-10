import * as dotenv from 'dotenv';
import { settings } from './config/config';
import { Client } from './Client';

dotenv.config();

const client = new Client(settings);
client.login(client.settings.token);
