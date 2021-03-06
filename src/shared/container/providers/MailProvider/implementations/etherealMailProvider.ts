import IMailProvider from '../models/IMailProvider';
import nodemailer,{Transporter} from 'nodemailer'
import ISendMailDto from '../dtos/ISendMailDto'
import {inject,injectable} from 'tsyringe'
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';



@injectable()
export default class EtherealMailProvider implements IMailProvider{
    private client:Transporter;
    constructor(
        @inject('MailTemplateProvider')
        private mailTemplateProvider: IMailTemplateProvider
    ){
       nodemailer.createTestAccount().then(account=>{
        const transporter = nodemailer.createTransport({
            host: account.smtp.host,
            port: account.smtp.port,
            secure: account.smtp.secure,
            auth: {
                user: account.user,
                pass: account.pass
            }
        });
        this.client=transporter;
       })
    }


    public async sendEmail({to,from,subject,templateData}:ISendMailDto):Promise<void>{
        const message = await this.client.sendMail({
            from: {
                name: from?.email || 'equipe gobarber',
                address: from?.email || 'vini.rosa.roo@gmail.com'
            },
            to:{
                name:to.name,
                address:to.email
            },
            subject,
            html: await this.mailTemplateProvider.parse(templateData)
        })

        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));

    }
}