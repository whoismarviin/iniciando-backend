import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository'
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment',()=>{
    it('should be able to create a new appointment', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);


        const appointment =await createAppointment.execute({
            date:new Date(),
            provider_id: '1234'
        })

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe('1234')
    
    })

    it('should not be able to create a new appointment in same date', async ()=>{
        const fakeAppointmentsRepository = new FakeAppointmentRepository();
        const createAppointment = new CreateAppointmentService(fakeAppointmentsRepository);

        await createAppointment.execute({
            date:new Date(),
            provider_id: '1234'
        })


        expect(createAppointment.execute({
            date:new Date(),
            provider_id: '1234'
        })).rejects.toBeInstanceOf(AppError)

    })

});