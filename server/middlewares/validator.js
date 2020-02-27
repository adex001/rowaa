import Response from '@utilities/response';

class Validator {

  static async validator (schema, req, res, next) {
    try {
      const filtered = await schema.validateAsync({
        ...req.params,
        ...req.body,
        ...req.query,
      });
      req.filtered = filtered;
      return next();
    } catch (error) {
      Response.error(res, 422, error.message);
    }
  };

  static validate (schema) {
    return async (...args) => {
      return await Validator.validator(schema, ...args);
    }
  }

}

export default Validator;
