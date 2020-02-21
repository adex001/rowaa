export default class Appointment {
  static book(req, res) {
      return res.status(201).json({
        status: 201,
        message: 'Appointment has been booked successfully!'
      })
  }
}
