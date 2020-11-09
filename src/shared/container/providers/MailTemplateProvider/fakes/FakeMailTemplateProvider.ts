import IMailTemplateProvider from '../models/IMailTemplateProvider'
import IMailTemplateProviderDTO from '../dtos/IMailTemplateProviderDTO'

export default class FakeEmailTemplateProvider implements IMailTemplateProvider{
    public async parse({template}:IMailTemplateProviderDTO):Promise<string>{
        return template;
    }
}