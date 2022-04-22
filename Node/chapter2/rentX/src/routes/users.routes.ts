import { Router } from 'express';
import multer from 'multer';
import { uploadConfig } from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/useCases/createUser/createUserController';
import { UpdateUserAvatarController } from '../modules/accounts/useCases/updateUserAvatar/updateUserAvatarController';

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig.upload('tmp/avatar'));

const updateUserAvatarUseCase = new UpdateUserAvatarController();
const createUserController = new CreateUserController();

usersRoutes.post('/', createUserController.handle);
usersRoutes.patch('/avatar', ensureAuthenticated, uploadAvatar.single('avatar'), updateUserAvatarUseCase.handle);

export { usersRoutes };
