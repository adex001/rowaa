import Joi from '@hapi/joi';

export const volunteerSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(20)
    .required(),
  lastname: Joi.string()
  .min(2)
  .max(20),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  occupation: Joi.string(),
  bio: Joi.string()
});


export const bookAppointmentSchema = Joi.object({
  firstname: Joi.string()
    .min(2)
    .max(20)
    .required(),
  lastname: Joi.string()
    .min(2)
    .max(20),
  email: Joi.string().email().required(),
  phone: Joi.string(),
  appointmentDate: Joi.date(),
  service: Joi.string(),
  size: Joi.string(),
  noOfAttachments: Joi.string(),
  hairDoHours: Joi.number().integer().min(1).max(30).required()
});

// const {firstname, lastname, email, phone, occupation, bio } = req.body;