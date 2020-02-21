import { Router } from 'express';
import controller from '../controllers'
const { Volunteer, Appointment } = controller;

const router = Router();

router.post('/volunteer', Volunteer.volunteer);
router.post('/book', Appointment.book)

export default router;
