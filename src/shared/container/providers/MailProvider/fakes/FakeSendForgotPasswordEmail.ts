import IMailProvider from '../models/IMailProvider'
import ISendMailDto from '../dtos/ISendMailDto'

interface Message{
    to:string;
    body:string;
}

export default class FakeSendForgotPasswordEmail implements IMailProvider{
    private messages:ISendMailDto[]= []
    
    public async sendEmail(message:ISendMailDto):Promise<void>{
        this.messages.push(message)

    }

}