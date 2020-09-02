import {Connection, createConnection, getRepository, Repository} from 'typeorm';
import {User} from '../entities/User';
import * as Keyv from 'keyv';

export async function connect() {
  await createConnection({
    type: 'postgres',
    url: process.env.DB_URL,
    entities: [User],
    synchronize: process.env.NODE_ENV == 'development',
    dropSchema: process.env.DROP_DB == 'true',
    
    // logging: true
  });

  DB.users = getRepository(User);
  DB.cache = new Keyv();
}

export const DB: {
  users: Repository<User>,
  conn: Connection,
  cache: typeof Keyv
} = {
  users: null,
  conn: null,
  cache: null
}