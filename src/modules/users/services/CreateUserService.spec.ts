import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import CreatUserService from './CreateUserService';
import FakeBCryptHashProvider from '@modules/users/providers/HashProvider/fakes/fakeBCryptHashProvider'

describe('CreateUser',()=>{
    it('should be able to create a new user', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeBCrypt = new FakeBCryptHashProvider();
        const createUser = new CreatUserService(fakeUserReposity,fakeBCrypt)

        const user = await createUser.execute({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })

        expect(user).toHaveProperty("id")
    
    });

    it('should not be able to create a new user with the same email', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeBCrypt = new FakeBCryptHashProvider();
        const createUser = new CreatUserService(fakeUserReposity,fakeBCrypt)

        await createUser.execute({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        });

      await expect(createUser.execute({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })).rejects.toBeInstanceOf(AppError)

    });

});