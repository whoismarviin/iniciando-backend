import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import FakeEmailProvider from '@shared/container/providers/MailProvider/fakes/FakeSendForgotPasswordEmail'
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokenRepository from '../repositories/fakes/fakeUserTokenRepository'



let fakeUserReposity:FakeUsersRepository;
let fakeUsersTokenReposity:FakeUsersTokenRepository;
let fakeMailProvider:FakeEmailProvider;
let sendForgotPassword:SendForgotPasswordEmailService;


describe('SendForgotPasswordEmail',()=>{
    beforeEach(()=>{
        fakeUserReposity = new FakeUsersRepository();
        fakeMailProvider = new FakeEmailProvider();
        fakeUsersTokenReposity= new FakeUsersTokenRepository();

        sendForgotPassword = new SendForgotPasswordEmailService(
            fakeUserReposity,
            fakeMailProvider,
            fakeUsersTokenReposity);

    })


    it('should be able to send a new reset email password', async ()=>{
        const sendEmail= jest.spyOn(fakeMailProvider,'sendEmail')

        await fakeUserReposity.create({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })

        await sendForgotPassword.execute({
            email:'vini.rosa.roo@gmail.com'
        })

        expect(sendEmail).toHaveBeenCalled();

    
    });

    it('should not be able to reset an password of a non existing user', async ()=>{
    
        await expect(sendForgotPassword.execute({
            email:'vini.rosa.roo@gmail.com'
        })).rejects.toBeInstanceOf(AppError)

    
    });

    it('should not be able to create an unique token to reset password', async ()=>{

        const generateToken = jest.spyOn(fakeUsersTokenReposity, 'generated')



        const user =await fakeUserReposity.create({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })

        await sendForgotPassword.execute({
            email:'vini.rosa.roo@gmail.com'
        })

        expect(generateToken).toHaveBeenCalledWith(user.id)



    
    });



});