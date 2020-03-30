import {Appointment} from '@models';
import {Op} from 'sequelize';
import Paystack from 'paystack';
import Response from '@utilities/response';
import moment from 'moment';
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
        // return res.status(201).json({
        //   status: 201,
        //   message: 'Appointment has been booked successfully!',
        //   data: bookAppointment
        // });
        return Response.success(res, 201, 'Appointment has been booked successfully!', bookAppointment);
      }
    });
  }

  // static async retrieveTimeSlots (req, res) {
  //   const { date } = req.body;
  //   const timeslots = ['8:00am', '9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm'];
  //   const endDate = moment(date).add(1, 'd');
  //   // Query appointment date 
  //   const data = await Appointment.findAll({
  //     where: {
  //       appointmentDate: {
  //         [Op.between]: [date, endDate]
  //       }
  //     }
  //   });
  //   return Response.success(res, 200, 'Time slots available', timeslots);
  // }

  static async retrieveTimeSlots (req, res) {
    const { date } = req.body;
    const fromDate = new Date(date).toISOString();
    const toDate = moment(fromDate).add(1, 'd');
    // Retrieve times from the database
    const appointments = await Appointment.findAll({
      where: {
        appointmentDate: {
          [Op.between]: [fromDate, toDate]
        }
      }
    });
    appointments.map((app) => {
      console.log(app.dataValues);
      const me = app.dataValues.appointmentDate;
      console.log(new Date(me).toLocaleTimeString());
      
      
    })
    
  }
}
