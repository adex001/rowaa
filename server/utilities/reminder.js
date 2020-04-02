import db from '@models';

class Reminder {
  static async sendBookingReminder() {

  const getAppointment = await 
    db.sequelize.query('SELECT * FROM (SELECT *, EXTRACT(DAY FROM "appointmentDate"-NOW()) AS difference FROM "Appointments") MyAlias WHERE difference BETWEEN 1 AND 3');

  return getAppointment;
  }

  static async sendReminderToBoss() {
    // Get details of all hairdressers
    // Check the appointments a particular hair dresser have
    // Send notification to hair dressers for all of them before 3 days to appointment. 

    // or send to rowaa
  }
}

export default Reminder;
