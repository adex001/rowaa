import Response from '@utilities/response';

class Validator {
  static textValidator(fields) {
    for (const input of fields) {
      if(input === 'email'){

      }
    }
    return true;
  }
  static validateVolunteer(req, res, next) {
    const {firstname, lastname, email, phone, occupation, bio } = req.body;
    try {
      Validator.textValidator(Object.keys(req.body));
      next();
    } catch (err) {
      Response.badRequest(res);
    }
  }
}

export default Validator;
