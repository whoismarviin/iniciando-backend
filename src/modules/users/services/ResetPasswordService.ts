import {inject,injectable} from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository'
import IUsersTokenRepository from '../repositories/IUsersTokenRepository'
import AppError from '@shared/errors/AppError';

interface Request {
    token:string;
    password:string;
}


@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,

    @inject('UsersToken')
    private usersTokenRepository:IUsersTokenRepository,
    ){
  
  }

  public async execute({token,password}:Request):Promise<void>{
    const userToken = await this.usersTokenRepository.findByToken(token)

      if(!userToken){
          throw new AppError('User does not exists')
      }

    const user = await this.usersRepository.findById(userToken.user_id);

      if(!user){
        throw new AppError('User does not exists')
    }

    user.password= password;
    await this.usersRepository.save(user)


    




  }
}

export default SendForgotPasswordEmailService;
