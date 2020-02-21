export default class Volunteer {
  static volunteer(req, res) {
    return res.status(201).json({
      status: 201,
      message: 'Successfully volunteered!'
    });
  }
}

