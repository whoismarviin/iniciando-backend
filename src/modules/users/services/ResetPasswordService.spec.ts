import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import FakeUsersTokenRepository from '../repositories/fakes/fakeUserTokenRepository'
import ResetPasswordService from '../services/ResetPasswordService';
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeSendForgotPasswordEmail'



let fakeUserReposity:FakeUsersRepository;
let fakeUsersTokenRepository:FakeUsersTokenRepository;
let fakeMailProvider:FakeEmailProvider;
let resetPassword:ResetPasswordService


describe('ResetPassword',()=>{
    beforeEach(()=>{
        fakeUserReposity = new FakeUsersRepository();
        fakeMailProvider = new FakeEmailProvider();
        fakeUsersTokenRepository= new FakeUsersTokenRepository();

        resetPassword = new ResetPasswordService(
            fakeUserReposity,
            fakeUsersTokenRepository);

    })


    it('should be able to recover a password', async ()=>{
        const user= await fakeUserReposity.create({
            name:'Vinicius Cruz da Rosa',
            email:'vini.rosa.roo@gmail.com',
            password:'1234',
        })

        const {token}= await fakeUsersTokenRepository.generated(user.id)

        await resetPassword.execute({
         password:'12334',
         token
        })

        const updatedUser = await fakeUserReposity.findById(user.id)

        expect(updatedUser?.password).toBe('12334')
    
    });





});