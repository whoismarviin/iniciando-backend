import { getRepository,Repository} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUsersDto from '@modules/users/dtos/ICreateUserDto'


class UserRepository implements IUsersRepository {
  private ormRepository: Repository<User>
  

  constructor(){
    this.ormRepository= getRepository(User);
  }

  public async findById(id:string):Promise<User|undefined>{
      const user= this.ormRepository.findOne(id)

      return user
  }

  public async findByEmail(email:string):Promise<User|undefined>{
      const user= this.ormRepository.findOne({
          where:email
      })
      return user
  }


  public async create(userData:IUsersDto):Promise<User>{

    const user = this.ormRepository.create(userData)

    this.ormRepository.save(user)

    return user

  }

  public async save(user:User):Promise<User>{
      return this.ormRepository.save(user)
  }
}

export default UserRepository;
