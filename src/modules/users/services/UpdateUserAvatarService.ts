import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import {inject,injectable} from 'tsyringe'
import IUserRepository from '@modules/users/repositories/IUserRepository'


import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatarFilename: string;
}


@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private userRepository:IUserRepository ){
  }



  public async execute({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
