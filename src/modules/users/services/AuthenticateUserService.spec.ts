import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import AuthenticateUserService from './AuthenticateUserService';
import CreatUserService from './CreateUserService';
import FakeBCryptHashProvider from '@modules/users/providers/HashProvider/fakes/fakeBCryptHashProvider'


describe('AuthenticateUser', ()=> {

    it('should be able to authenticate a user', async ()=>{

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

    it('should not be able to authenticate a non-existing user', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeBCrypt = new FakeBCryptHashProvider();
        const authenticateUser = new AuthenticateUserService(fakeUserReposity,fakeBCrypt)
    
        await expect( authenticateUser.execute({
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })).rejects.toBeInstanceOf(AppError)
    
    
    });



    it('should  not be able to authenticate a user with wrong password', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeBCrypt = new FakeBCryptHashProvider();
        const createUser = new CreatUserService(fakeUserReposity,fakeBCrypt)
        const authenticateUser = new AuthenticateUserService(fakeUserReposity,fakeBCrypt)
    
        await createUser.execute({
             name:'Vinicius Cruz',
             email:'vini.rosa.roo@gmail.com',
             password:'1234'
         })
    
  
        await expect( authenticateUser.execute({
            email:'vini.rosa.roo@gmail.com',
            password:'non-existing'
        })).rejects.toBeInstanceOf(AppError)
       
    
    });

});



