import {hash,compare} from 'bcryptjs';

import IHashProvider from '../models/IHashProvider';

export default class BCriptHashProvider implements IHashProvider {
    public async compareHashed(payload:string,hashed:string):Promise<boolean>{
        return compare(payload,hashed)
    };

    public async generateHashed(payload:string):Promise<string>{
        return hash(payload,8)

    }
}