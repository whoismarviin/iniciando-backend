import { Router } from 'express';
import SendForgotPasswordEmailController from '../controllers/forgotPasswordController'
import ResetPasswordController from '../controllers/ResetPasswordController'


const sessionsRouter = Router();
const sendForgotController = new SendForgotPasswordEmailController();
const resetPasswordController = new ResetPasswordController();



sessionsRouter.post('/forgot',  sendForgotController.create);
sessionsRouter.post('/reset',  resetPasswordController.create);

export default sessionsRouter;
