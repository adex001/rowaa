import {Appointment} from '@models';
import Paystack from 'paystack';
import Response from '@utilities/response';
import { sendBookingAppointmentNotification, sendNotificationToBoss} from '@utilities/emailsender';

export default class AppointmentController {
  static async book(req, res) {
    const { transactionReference } = req.body;
    const paystack = Paystack(process.env.PAYSTACK_SECRET_KEY);
    paystack.transaction.verify(transactionReference, async function(err, body) {     
      if (err) {
        return Response.error(res, 500, 'Payment cannot be verified')
      }
      const { data } = body;
      if (data.status === 'success') {
        const bookAppointment = await Appointment.create({...req.body});
        const {email, firstname, lastname, appointmentDate} = bookAppointment;
        // sendBookingAppointmentNotification(email, `${firstname} ${lastname ? lastname : ''}`, appointmentDate);
        // sendNotificationToBoss({...bookAppointment}, {});
        return res.status(201).json({
          status: 201,
          message: 'Appointment has been booked successfully!',
          data: bookAppointment
        })
      }
    });
  }
}
