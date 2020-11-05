
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserTokens';

import IUserRepository from '../IUsersTokenRepository'


class FakeUserTokenRepository implements IUserRepository{
    private usersTokens:UserToken[]=[]

    public async generated(user_id:string):Promise<UserToken>{
        const userToken = new UserToken;

        Object.assign(userToken,{
            id:uuid(),
            token:uuid(),
            user_id,
        })

        return userToken;
    }

    public async findByToken(token:string):Promise<UserToken|undefined>{
        const userToken = this.usersTokens.find(findToken => findToken.token == token)

        return userToken
    }

}

export default FakeUserTokenRepository;
