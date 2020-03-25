import { Appointment } from '@models';
import sequelize, {Op} from 'sequelize';
import moment from 'moment';

class Reminder {
  static async sendBookingReminder() {
    // const getAppointments = await Appointment.findAll({
    //   where: {
    //     appointmentDate: {
    //       [Op.gte]: new Date()
    //     }
    //   }
    // });

    // const getAppointments = await Appointment.findAll({
    //   where: sequelize.where(sequelize.fn('DATE_PART', sequelize.fn("NOW"), sequelize.col('appointmentDate')), {
    //     [Op.lte] : 3
    //   })
    // });

    const dateString = '01/03/2019';

    const getAppointments = await Appointment.findAll({
      where: sequelize.literal(`DATE_PART(${Date.now()}, appointmentDate) <= 3`)
  })

    return getAppointments;;
  }

  static async sendNotificationToBoss() {
    // Get details of all hairdressers
    // Check the appointments a particular hair dresser have
    // Send notification to hair dressers for all of them before 3 days to appointment. 

    // or send to rowaa
  }
}

export default Reminder;
