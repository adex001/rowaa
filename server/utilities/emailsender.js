import sgMail from '@sendgrid/mail';
import Mailgen from 'mailgen';
import { config } from 'dotenv';

config();

const projectName = 'Rowaa';
const projectEmail = process.env.PROJECT_EMAIL || 'noreply@rowaango.org';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: projectName,
    link: 'www.rowaa.com'
  }
});

export const sendMail = async ({ to, subject, message }) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    html: message
  };

  await sgMail.send(mailOptions);
};

export const sendVolunteerNotification = async (email, name, appointment) => {
  const emailBody = {
    body: {
      name,
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hi <b>${name}</b>, <br> We want to thank you for volunteering!`,
      outro: 'Thank you and have a nice day!'
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return await sendMail({
    to: email,
    subject: `${projectName}: About your Volunteer`,
    message
  });
};

export const sendBookingAppointmentNotification = async (email, name, appointment) => {
  const emailBody = {
    body: {
      name,
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hi <b>${name}</b>, <br><br> This is to remind you that your appointment is scheduled on ${appointment}.`,
      outro: 'Thank you and have a nice day!'
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return await sendMail({
    to: email,
    subject: `${projectName}: About your Appointment`,
    message
  });
};

export const sendNotificationToBoss = async (senderObject, bossObject) => {
  const { email, name} = bossObject;
  const { senderEmail, senderName, lastname, phone, appointmentDate, size, noOfAttachments, hairDoHours} = senderObject;
  const emailBody = {
    body: {
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hi <b>${name}</b>, <br> This is to inform you that you have been booked and the details is as follows:
        <p> 
          <li>Name: ${firstname} ${lastname ? lastname: ''} </li>
          ${phone ? `<li>Phone: ${phone} </li>` : ''}
          ${senderEmail ? `<li>Email: ${senderEmail} </li>` : ''}
          <li>Date of Appointment: ${appointmentDate}</li>
          <li>Size: ${size}</li>
          <li>No of Attachments: ${noOfAttachments}</li>
          <li>Estimated hours of hairdo: ${hairDoHours}</li>
        </p>
      `,
      outro: 'Thank you and have a nice day!'
    }
  }

  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return await sendMail({
    to: email,
    subject: `${projectName}: About your Appointment`,
    message
  });
}