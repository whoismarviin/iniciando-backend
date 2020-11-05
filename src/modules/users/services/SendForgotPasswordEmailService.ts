import {inject,injectable} from 'tsyringe';

import IUserRepository from '@modules/users/repositories/IUserRepository'
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider'
import AppError from '@shared/errors/AppError';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository'

interface Request {
  email: string;
}


@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository:IUserRepository,
    
    @inject('MailProvider')
    private mailProvider:IMailProvider,

    @inject('UsersToken')
    private usersTokenRepository:IUsersTokenRepository,

    ){
  
  }

  public async execute({email}:Request):Promise<void>{
    const user = await this.usersRepository.findByEmail(email)

    if(!user){
      throw new AppError('User does not exist on apllication system gurl')
    }

    await this.usersTokenRepository.generated(user.id)

    this.mailProvider.sendEmail(email,'requisição feita por mim manualmente')

  }
}

export default SendForgotPasswordEmailService;
