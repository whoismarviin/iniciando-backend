import ISendEmailDto from '../dtos/ISendMailDto'

export default interface IMailProvider {
    sendEmail(data:ISendEmailDto):Promise<void>
}