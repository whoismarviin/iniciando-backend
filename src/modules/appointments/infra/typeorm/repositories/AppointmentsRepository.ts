import { getRepository,Repository} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IAppointmentsDto from '@modules/appointments/dtos/IAppointmentsDto'


class AppointmentRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>
  

  constructor(){
    this.ormRepository= getRepository(Appointment);
  }


  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment;
  }

  public async create({provider_id,date}:IAppointmentsDto):Promise<Appointment>{

    const appointment = this.ormRepository.create({
      provider_id,
      date
    })

    this.ormRepository.save(appointment)

    return appointment

  }
}

export default AppointmentRepository;
