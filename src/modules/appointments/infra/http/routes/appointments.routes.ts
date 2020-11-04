import { Router } from 'express';
import AppointmentController from '@modules/appointments/infra/http/controllers/AppointmentController'
import ensureAuthenticated from '@modules/users/infra/middlewares/ensureAutheticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);
const appointmentController = new AppointmentController()



appointmentsRouter.post('/', appointmentController.create )

export default appointmentsRouter;
