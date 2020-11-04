import {Request,Response} from 'express'
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository'


export default class sessionsController{
    public async create(request:Request,response:Response):Promise<Response>{
        const { email, password } = request.body;
        const userRepository = new UsersRepository()

        const authenticateUser = new AuthenticateUserService(userRepository);

        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        delete user.password;

        return response.json({ user, token });
    }
}