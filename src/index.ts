import * as dotenv from 'dotenv';
import { settings } from './config/config';
import { Client } from './Client';

dotenv.config();

// eslint-disable-next-line no-new
new Client(settings);
