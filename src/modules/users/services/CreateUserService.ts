import {inject,injectable} from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'

import User from '@modules/users/infra/typeorm/entities/User';
import IUserRepository from '@modules/users/repositories/IUserRepository'

interface Request {
  name: string;
  email: string;
  password: string;
}


@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,

    @inject('HashProvider')
    private hashProvider:IHashProvider
    ){
  
  }

  public async execute({ name, email, password }: Request): Promise<User|undefined> {

    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHashed(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user
  }
}

export default CreateUserService;
