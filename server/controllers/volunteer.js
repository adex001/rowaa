import {Volunteer} from '@models';

export default class VolunteerController {
  static async volunteer(req, res) {
    const volunteer = await Volunteer.create({...req.body})
    return res.status(201).json({
      status: 201,
      message: 'Successfully volunteered!',
      data: volunteer
    });
  }
}
