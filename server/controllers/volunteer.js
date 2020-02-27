import {Volunteer} from '@models';
import { sendVolunteerNotification } from '@utilities/emailsender';

export default class VolunteerController {
  static async volunteer(req, res) {
    const volunteer = await Volunteer.create({...req.body});
    sendVolunteerNotification(volunteer.email, volunteer.firstname, volunteer.appointmentDate);
    return res.status(201).json({
      status: 201,
      message: 'Successfully volunteered!',
      data: volunteer
    });
  }
}
