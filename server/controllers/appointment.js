import {Appointment} from '@models';
import { sendBookingAppointmentNotification } from '@utilities/emailsender';

export default class AppointmentController {
  static async book(req, res) {
    const bookAppointment = await Appointment.create({...req.body});
    const {email, firstname, lastname, appointmentDate} = bookAppointment;
    sendBookingAppointmentNotification(email, `${firstname} ${lastname}`, appointmentDate);
    return res.status(201).json({
      status: 201,
      message: 'Appointment has been booked successfully!',
      data: bookAppointment
    })
  }
}
