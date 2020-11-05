import {inject,injectable} from 'tsyringe'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider'


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
    private userRepository:IUserRepository,

    @inject('StorageProvider')
    private storageProvider:IStorageProvider
    
    ){
  }



  public async execute({ user_id, avatarFilename }: Request): Promise<User> {

    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar.', 401);
    }

    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar)
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename)

    user.avatar = fileName;

    await this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
