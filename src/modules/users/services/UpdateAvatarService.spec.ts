import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/fakeUserReposity'
import UpdateUserService from './UpdateUserAvatarService';
import FakeDiskStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'


describe('UpdateUserAvatarService',()=>{
    it('should be able to update an avatar', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateAvatarUserService = new UpdateUserService(fakeUserReposity,fakeDiskStorageProvider);

        const user = await fakeUserReposity.create({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        })

        await updateAvatarUserService.execute({
            user_id: user.id,
            avatarFilename:'avatar.png'
          
        })
        
        expect(user.avatar).toBe('avatar.png')
    });

    it('should not be able to update an avatar from a non existing user', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateAvatarUserService = new UpdateUserService(fakeUserReposity,fakeDiskStorageProvider);

        await expect(updateAvatarUserService.execute({
            user_id: 'non-existing-user',
            avatarFilename:'avatar.png'
        })).rejects.toBeInstanceOf(AppError)
        
    });


    it('should delete an avatar when updating one', async ()=>{

        const fakeUserReposity = new FakeUsersRepository();
        const fakeDiskStorageProvider = new FakeDiskStorageProvider();
        const updateAvatarUserService = new UpdateUserService(fakeUserReposity,fakeDiskStorageProvider);

        const user = await fakeUserReposity.create({
            name:'Vinicius Cruz',
            email:'vini.rosa.roo@gmail.com',
            password:'1234'
        });

        const deleteFile =jest.spyOn(fakeDiskStorageProvider,'deleteFile')

        await updateAvatarUserService.execute({
            user_id: user.id,
            avatarFilename:'avatar.png'
          
        });

        await updateAvatarUserService.execute({
            user_id: user.id,
            avatarFilename:'avatar2.png'
          
        })

        expect(deleteFile).toHaveBeenCalledWith('avatar.png')
        
    });




});