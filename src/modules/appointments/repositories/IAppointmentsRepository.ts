import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsDto from '@modules/appointments/dtos/IAppointmentsDto'

export default interface IAppointmentsRepository{
    create(data:IAppointmentsDto): Promise<Appointment>
    findByDate(date:Date): Promise<Appointment| undefined>
}