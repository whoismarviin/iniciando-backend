import IMailTemplateDto from '@shared/container/providers/MailTemplateProvider/dtos/IMailTemplateProviderDTO'

interface IMailContact {
    name:string;
    email:string
}

export default interface ISendMailDto{
    to:IMailContact;
    from?:IMailContact;
    subject:string;
    templateData:IMailTemplateDto
}