import fs from 'fs'
import path from 'path';
import uploadsConfig from '@config/upload'
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider{
    public async saveFile(file:string):Promise<string>{
        await fs.promises.rename(
            path.resolve(uploadsConfig.tmpFolder,file),
            path.resolve(uploadsConfig.tmpFolder,file)
        )

        return file
    }

    public async deleteFile(file:string):Promise<void>{
        const filePath = path.resolve(uploadsConfig.tmpFolder,file);

        try{
            await fs.promises.stat(filePath)
        }catch{
            return;
        }
        
        await fs.promises.unlink(filePath)
    }
}