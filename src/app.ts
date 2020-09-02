import {config} from 'dotenv';
config();

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';

import * as Koa from 'koa';
import {connect} from './utils/db';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import * as logger from 'koa-logger';
import * as koaSession from 'koa-session';
import router from './router';
import {prepare} from './scraper';

(async () => {
  await connect();
  await prepare();
  const app = new Koa();

  app.use(cors());
  app.use(bodyParser());
  app.use(logger());

  app.keys = ['millie'];
  app.use(koaSession({}, app));

  app.use(router.routes()).use(router.allowedMethods());

  app.listen(4000, () => {
    console.log('API RUNNING!');
  })
})();
