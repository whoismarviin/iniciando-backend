import { getRepository,Repository} from 'typeorm';

import userToken from '@modules/users/infra/typeorm/entities/UserTokens';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';


class UserTokensRepository implements IUsersTokenRepository {
  private ormRepository: Repository<userToken>
  

  constructor(){
    this.ormRepository= getRepository(userToken);
  }

  public async findByToken(token:string):Promise<userToken|undefined>{
      const userToken = await this.ormRepository.findOne({where: {token}})

      return userToken;
  }

  public async generated(user_id:string):Promise<userToken>{
        const userToken = this.ormRepository.create({
            user_id
        })

        await this.ormRepository.save(userToken)

        return userToken

  }


}

export default UserTokensRepository;
