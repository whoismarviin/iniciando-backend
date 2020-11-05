import IMailProvider from '../models/IMailProvider'

interface Message{
    to:string;
    body:string;
}

export default class FakeSendForgotPasswordEmail implements IMailProvider{
    private messages:Message[]= []
    
    public async sendEmail(to:string,body:string):Promise<void>{
        this.messages.push({
            to,
            body
        })

    }

}