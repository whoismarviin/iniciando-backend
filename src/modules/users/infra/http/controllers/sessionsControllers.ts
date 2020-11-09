import {Request,Response} from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider'
import BCryptHashProvider from '@modules/users/providers/HashProvider/implementations/BCryptHashProvider'

export default class sessionsController{
    public async create(request:Request,response:Response):Promise<Response>{
        const { email, password } = request.body;
        const userRepository = new UsersRepository()
        const hashProvider = new BCryptHashProvider()

        const authenticateUser = new AuthenticateUserService(userRepository,hashProvider);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}