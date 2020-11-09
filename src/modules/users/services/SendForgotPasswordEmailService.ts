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

    const {token} =await this.usersTokenRepository.generated(user.id)

    this.mailProvider.sendEmail({
      to:{
        name: user.name,
        email:user.email
      },
      subject:'[GoBarber] Recuperação de senha',
      templateData:{
        template:'Olá {{name}}: {{token}}',
        variables:{
          name: user.name,
          token
        }
      }

    })

  }
}

export default SendForgotPasswordEmailService;
