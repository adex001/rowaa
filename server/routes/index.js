import { Router } from 'express';
import controller from '../controllers'
import Validator from '@middlewares/validator';
const { Volunteer, Appointment } = controller;


const router = Router();

router.post('/volunteer', Validator.validateVolunteer, Volunteer.volunteer);
router.post('/book', Appointment.book)

export default router;
