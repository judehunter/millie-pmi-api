import {Connection, createConnection, getRepository, Repository} from 'typeorm';
import {User} from '../entities/User';

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
}

export const DB: {
  users: Repository<User>,
  conn: Connection
} = {
  users: null,
  conn: null
}