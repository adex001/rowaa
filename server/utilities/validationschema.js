export const volunteerSchema = {
  firstname: {
    error: 'Enter a valid firstname',
    required: true
  },
  lastname: {
    error: 'Enter a valid lastname',
  },
  email: {
    error: 'Enter a valid email address'
  },
  phone: {
    error: 'Enter a valid phone number'
  },
  occupation: {
    error: 'Enter a valid occupation'
  },
  
}

// const {firstname, lastname, email, phone, occupation, bio } = req.body;