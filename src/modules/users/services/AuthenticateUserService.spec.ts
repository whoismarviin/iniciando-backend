import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import AuthenticateUserService from './AuthenticateUserService';
import CreatUserService from './CreateUserService';
import FakeBCryptHashProvider from '@modules/users/providers/HashProvider/fakes/fakeBCryptHashProvider'


it('should be able to create a new user', async ()=>{

    const fakeUserReposity = new FakeUsersRepository();
    const fakeBCrypt = new FakeBCryptHashProvider();
    const createUser = new CreatUserService(fakeUserReposity,fakeBCrypt)
    const authenticateUser = new AuthenticateUserService(fakeUserReposity,fakeBCrypt)

     const user = await createUser.execute({
         name:'Vinicius Cruz',
         email:'vini.rosa.roo@gmail.com',
         password:'1234'
     })

    const response = await authenticateUser.execute({
        email:'vini.rosa.roo@gmail.com',
        password:'1234'
    })

    expect(response.user).toEqual(user);
    expect(response).toHaveProperty('token')


});