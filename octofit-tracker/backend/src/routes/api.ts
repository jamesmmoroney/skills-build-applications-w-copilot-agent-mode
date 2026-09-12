import { Router } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/octofit.js';

const router = Router();

function collectionRoutes(model: typeof User) {
  const collectionRouter = Router();

  collectionRouter.get('/', async (_request, response, next) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      next(error);
    }
  });

  collectionRouter.post('/', async (request, response, next) => {
    try {
      const document = await model.create(request.body);
      response.status(201).json(document);
    } catch (error) {
      next(error);
    }
  });

  return collectionRouter;
}

router.use('/users', collectionRoutes(User));
router.use('/teams', collectionRoutes(Team));
router.use('/activities', collectionRoutes(Activity));
router.use('/leaderboard', collectionRoutes(Leaderboard));
router.use('/workouts', collectionRoutes(Workout));

export default router;