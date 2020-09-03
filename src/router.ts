import * as Router from 'koa-router';
import {scrapeProfile} from './scraper';
import {CTX, STATE} from './utils/ctx';
import {DB} from './utils/db';
const router = new Router<STATE, CTX>();

router.post('/', async ctx => {
  const {experiences, volunteerExperiences, skills, ...linkedInData} = await scrapeProfile(ctx.request.body.linkedInUrl);
  let user = DB.users.create();
  user.name = ctx.request.body.name;
  user.email = ctx.request.body.email;
  user.data = {
    ...linkedInData,
    formData: {
      moreInfo: ctx.request.body.moreInfo,
      expertise: ctx.request.body.expertise,
      graduationYear: ctx.request.body.graduationYear,
      internationalSchool: ctx.request.body.internationalSchool
    }
  };
  user = await DB.users.save(user);
  ctx.body = user;
});

router.get('/users', async ctx => {
  ctx.body = await DB.users.find();
})

export default router;