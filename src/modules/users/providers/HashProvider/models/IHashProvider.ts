export default interface IHashProvider{
    generateHashed(payload:string):Promise<string>;
    compareHashed(payload:string,hashed:string):Promise<boolean>
}