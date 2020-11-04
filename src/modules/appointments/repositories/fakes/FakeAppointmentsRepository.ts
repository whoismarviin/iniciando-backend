import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IAppointmentsDto from '@modules/appointments/dtos/IAppointmentsDto'
import { uuid } from 'uuidv4';
import {isEqual} from 'date-fns'


class FakeAppointmentRepository implements IAppointmentsRepository {
    private appointments:Appointment[] =[]
 
  
  public async findByDate(date: Date): Promise<Appointment | undefined> {
      const findAppointment = this.appointments.find(appointment =>  isEqual(appointment.date,date));

      return findAppointment;
  
  }

  public async create({provider_id,date}:IAppointmentsDto):Promise<Appointment>{
      const appointment = new Appointment();

      Object.assign(appointment,{id:uuid(),provider_id,date})

      this.appointments.push(appointment)

      return appointment;
  }
}

export default FakeAppointmentRepository;
