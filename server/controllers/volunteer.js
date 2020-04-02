import {Volunteer} from '@models';
import { sendVolunteerNotification } from '@utilities/emailsender';

export default class VolunteerController {
  static async volunteer(req, res) {
    try {
      const volunteer = await Volunteer.create({...req.body});
      sendVolunteerNotification(volunteer.email, volunteer.firstname, new Date(volunteer.appointmentDate).toLocaleString());
      return res.status(201).json({
        status: 201,
        message: 'Successfully volunteered!',
        data: volunteer
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'internal server error!'
      });
    }
  }
}
