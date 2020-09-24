import { Router } from 'express';

import appointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

appointmentsRouter.get('/', appointmentsController.List);
appointmentsRouter.post('/', appointmentsController.Create);

export default appointmentsRouter;
