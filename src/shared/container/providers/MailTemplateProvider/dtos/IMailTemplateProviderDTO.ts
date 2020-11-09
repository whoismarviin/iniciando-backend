interface ITemplateVariables{
    [key:string]: string | number
}

export default interface IMailTemplateProviderDTO{
    template:string;
    variables: IMailTemplateProviderDTO
}