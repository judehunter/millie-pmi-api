import {Middleware} from 'koa';

import * as jwt from 'jsonwebtoken';
import {CTX, STATE} from '../utils/ctx';
import {DB} from '../utils/db';

export const getMe: Middleware<STATE, CTX> = async (ctx, next) => {
  if (process.env.NODE_ENV === 'development' && process.env.DEV_USER_ID) {
    ctx.state.user = await DB.users
      .findOne({where: {id: process.env.DEV_USER_ID}, relations: ['subscribedCategories']});
    await next();
    return;
  }

  const rawjwt = ctx.headers.authorization?.split(' ')[1];
  if (rawjwt) {
    const payload = jwt.verify(rawjwt, process.env.JWT_SECRET) as {socialId: string};
    ctx.state.user = await DB.users
      .findOne({where: {socialId: payload.socialId}, relations: ['subscribedCategories']});
  }
  await next();
}

export const loggedInGuard: Middleware<STATE, CTX> = async (ctx, next) => {
  if (ctx.state.user) await next();
  else {
    ctx.throw(401);
  }
}

export const adminGuard: Middleware<STATE, CTX> = async (ctx, next) => {
  if (ctx.state.user?.role === 'admin') await next();
  else {
    ctx.throw(401);
  }
}
