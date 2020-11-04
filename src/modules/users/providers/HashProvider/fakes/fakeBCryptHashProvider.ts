
import IHashProvider from '../models/IHashProvider';

export default class FakeBCriptHashProvider implements IHashProvider {
    public async compareHashed(payload:string,hashed:string):Promise<boolean>{
        return payload == hashed
    };

    public async generateHashed(payload:string):Promise<string>{
        return payload

    }
}