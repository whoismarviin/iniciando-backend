import {Request,Response} from 'express'
import {container} from 'tsyringe'
import ResetPasswordService from '@modules/users/services/ResetPasswordService'


export default class forgotPasswordController{
    public async create(request:Request,response:Response):Promise<Response>{
        const {password,token}= request.body;

        const resetPassword = container.resolve(ResetPasswordService)

        await resetPassword.execute({
            password,
            token
        })

        return response.status(200).json({message:'Autorizado'})


    }

}