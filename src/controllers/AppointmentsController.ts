import { Request, Response } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentsService from '../services/CreateAppointmentService';

const appointmentsRepository = new AppointmentsRepository();

class AppointmentsController {
  public List(request: Request, response: Response): Response {
    const appointments = appointmentsRepository.all();
    return response.json(appointments);
  }

  public Create(request: Request, response: Response): Response {
    try {
      const { provider, date } = request.body;

      const parsedDate = parseISO(date);

      const createAppointments = new CreateAppointmentsService(
        appointmentsRepository,
      );

      const appointment = createAppointments.execute({
        provider,
        date: parsedDate,
      });

      return response.json(appointment);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}

export default new AppointmentsController();
