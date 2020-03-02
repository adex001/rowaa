import { Appointment } from '@models';
import { Op} from 'sequelize';

class Reminder {
  static async sendBookingReminder() {
    const getAppointments = await Appointment.findAll({
      where: {
        appointmentDate: {
          [Op.gte]: new Date()
        }
      }
    });
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
