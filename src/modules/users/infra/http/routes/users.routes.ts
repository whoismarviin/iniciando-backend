import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController'
import UpdateAvatarController from '../controllers/UpdateAvatarController'

import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAutheticated';
const usersController = new UsersController();
const updateAvatarController= new UpdateAvatarController();

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  updateAvatarController.update

);

export default usersRouter;
