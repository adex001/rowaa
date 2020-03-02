import { Router } from 'express';
import Validator from '@middlewares/validator';
import * as Schema from '@utilities/validationschema';
import controller from '../controllers'

const { Volunteer, Appointment, Order } = controller;


const router = Router();

router.post('/volunteer', Validator.validate(Schema.volunteerSchema), Volunteer.volunteer);
router.post('/book', Validator.validate(Schema.bookAppointmentSchema), Appointment.book);
router.post('/preorder', Validator.validate(Schema.preorderSchema), Order.preorder);

export default router;
