import {Appointment} from '@models';

export default class AppointmentController {
  static async book(req, res) {
    const bookAppointment = await Appointment.create({...req.body})
    return res.status(201).json({
      status: 201,
      message: 'Appointment has been booked successfully!',
      data: bookAppointment
    })
  }
}
