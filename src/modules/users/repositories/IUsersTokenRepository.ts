import UserToken from '@modules/users/infra/typeorm/entities/UserTokens';

export default interface IUsersTokenRepository {
    generated(user_id:string):Promise<UserToken>
    findByToken(token:string):Promise<UserToken|undefined>
}