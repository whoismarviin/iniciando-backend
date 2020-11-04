import User from '@modules/users/infra/typeorm/entities/User'
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto'

export default interface IUsersRepository {
    findById(id:string):Promise<User|undefined>
    findByEmail(email:string):Promise<User|undefined>
    create(data:ICreateUserDto):Promise<User|undefined>
    save(user:User):Promise<User>

}