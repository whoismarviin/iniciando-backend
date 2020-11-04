
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import IUsersDto from '@modules/users/dtos/ICreateUserDto'
import { uuid } from 'uuidv4';


class UserRepository implements IUsersRepository {
    private users:User[]=[]


  public async findById(id:string):Promise<User|undefined>{
      const user= this.users.find(findUser => findUser.id= id);

      return user;
  }

  public async findByEmail(email:string):Promise<User|undefined>{
    const user= this.users.find(findUser => findUser.email= email);

    return user;
    
  }


  public async create(userData:IUsersDto):Promise<User>{
      const user = new User()

      Object.assign({id:uuid()},userData);

      this.users.push(user)

      return user;

  }

  public async save(user:User):Promise<User>{
      const findIndex = this.users.findIndex(findUser => findUser.id = user.id)

      this.users[findIndex]= user;

      return user;
  }
}

export default UserRepository;
