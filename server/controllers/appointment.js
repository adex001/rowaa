import {Appointment} from '@models';
import {Op} from 'sequelize';
import Paystack from 'paystack';
import Response from '@utilities/response';
import moment from 'moment';
import { sendBookingAppointmentNotification, sendNotificationToBoss} from '@utilities/emailsender';

function timeSlots (hours) {
  let i = 0; let j = 8; const myTimes = [];
  while (i <= 12) {
    myTimes.push(`${j > 12 ? j %12 : j}:00 ${i<4 ? 'AM' : 'PM'}`);
    i = i + hours;
    j = j+ hours;
  }

  return myTimes;
}

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
        sendBookingAppointmentNotification(email, `${firstname} ${lastname ? lastname : ''}`, appointmentDate);
        // sendNotificationToBoss({...bookAppointment}, {});
        return Response.success(res, 201, 'Appointment has been booked successfully!', bookAppointment);
      }
    });
  }
  
  static async retrieveTimeSlots (req, res) {
    try {
      const { date } = req.body;
      const fromDate = new Date(date).toISOString();
      const toDate = moment(fromDate).add(1, 'd');
      // Retrieve times from the database
      const appointments = await Appointment.findAll({
        where: {
          appointmentDate: {
            [Op.between]: [fromDate, toDate]
          }
        },
        attributes: ['appointmentDate']
      });
      const registeredTimeSlots = [];
      appointments.map((app) => {
        const me = app.appointmentDate;
        registeredTimeSlots.push(new Date(me).toLocaleTimeString([], {
          hour: '2-digit', minute: '2-digit'
        }))
      });
  
      const me = timeSlots(1);
      if (!appointments) return res.status(200).json({
        status: 200,
        data: me
      })
      
      // eradicate the ones that match in the timeSlots
      const filtered = me.filter(item => {
        return !registeredTimeSlots.includes(item);
      });
      
      return res.status(200).json({
        data: filtered
      })
    } catch (err) {
      return Response.error(res, 500, 'internal server error!')
    }
    
  }
}
