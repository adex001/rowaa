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
    logo
  }
});

export const sendMail = ({ to, subject, message }) => {
  const mailOptions = {
    from: `${projectName} <${projectEmail}>`,
    to,
    subject,
    html: message
  };

  sgMail.send(mailOptions);
};

export const sendNotification = (email, name, appointment) => {
  const emailBody = {
    body: {
      name,
      title: `<h1 style="text-align: center; color: #000000"> ${projectName} </h1>`,
      intro: `Hi <b>${name.toUpperCase()}</b>, This is to remind you that your appointment is scheduled on ${appointment}.`,
      // action: {
      //   instructions: 'Click on the button below to verify your mail and start enjoying full access.',
      //   button: {
      //     color: '#335BCF',
      //     text: 'Verify Your Account',
      //     link: `${url}/auth/activate_user?email=${email}&token=${token}`
      //   }
      // },
      outro: 'Have a nice day'
    }
  };
  // Generate an HTML email with the provided contents
  const message = mailGenerator.generate(emailBody);

  return sendMail({
    to: email,
    subject: `${projectName}: Appointment`,
    message
  });
};
