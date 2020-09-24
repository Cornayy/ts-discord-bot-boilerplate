import 'reflect-metadata';
import * as dotenv from 'dotenv';
import { Container } from 'typedi';
import { Client } from './Client';

dotenv.config();
Container.get(Client);
